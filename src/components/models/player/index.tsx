import { Html, useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, useEffect, useReducer, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useSelector } from '@/store'
import * as movingController from './moveReducer'
import * as skillController from './skillReducer'
import VirtualKeyboard from '../../helper/virtualKeyboard'
import { switchAction } from '@/utils/animate'
import { BASE_ATTACK_SPEED, DASH_SPEED } from '@/game/constants/battle'
import { useAsyncReducer } from '@/hooks/useAsyncReducer'

interface Props {
  src: string
  action?: string
}

const Player: FC<Props> = ({ src }) => {
  const keyboard = useSelector(state => state.keyboard)

  const [movingState, dispatchMovingState] = useReducer(
    movingController.getDirectReducer(keyboard),
    movingController.initialData
  )

  const [skillState, dispatchSkillState, asyncDispatchSkillState] = useAsyncReducer(
    skillController.getDirectReducer(keyboard),
    skillController.initialData
  )

  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  const onKeydown = ({ key }: KeyboardEvent) => {
    dispatchMovingState({ key, switch: true })
    dispatchSkillState({ type: 'keydown', key })
  }
  const onKeyup = ({ key }: KeyboardEvent) => {
    dispatchMovingState({ key, switch: false })
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)
    actions.standby?.play()
    return () => {
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('keyup', onKeyup)
    }
  }, [])

  const meshRef = useRef<Mesh>(null!)
  useFrame((_, delta) => {
    if (!meshRef.current) { return }

    const isMoving = Object.values(movingState.direction).some(direct => direct)
    if (!skillState.action && !isMoving) { switchAction(actions) }

    switch (skillState.action) {
      case 'attack':
        switchAction(actions, 'attack')
        asyncDispatchSkillState(
          () => new Promise(resolve => {
            setTimeout(resolve, BASE_ATTACK_SPEED)
          }),
          () => ({
            type: 'update', newState: {
              action: undefined
            }
          })
        )
        break
      case 'dash':
        delta *= DASH_SPEED
        dispatchSkillState({ type: 'update', newState: { action: undefined } })
        break
    }

    meshRef.current.position.x += movingState.direction.x * delta
    meshRef.current.position.y += movingState.direction.y * delta
    meshRef.current.position.z += movingState.direction.z * delta

    meshRef.current.rotation.y = movingState.rotation * Math.PI / 180

    if (actions.walk) {
      const isWalking = [keyboard.front, keyboard.left, keyboard.back, keyboard.right]
        .some(key => movingState.keyboardStatus[key])
      if (isWalking) {
        switchAction(actions, 'walk')
        actions.walk.play()
      } else {
        actions.walk.stop()
      }
    }
  })

  return (
    <>
      <Html>
        <VirtualKeyboard />
      </Html>
      <mesh ref={meshRef}>
        <primitive object={gltf.scene} />
      </mesh>
    </>
  )
}

export default Player
