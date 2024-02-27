import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, useEffect, useReducer, useRef } from 'react'
import { IController } from '@/types/controller'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { getReverseDirection, mergeDeg } from '@/utils/direction'
import { useSelector } from '@/store'
import { baseKeyboard } from '@/store/keyboard'

const initialcontroller: IController & {
  keyboardStatus: Record<KeyboardEvent['key'], boolean>
} = {
  keyboardStatus: {},
  direction: { x: 0, y: 0, z: 0 },
  rotation: 0
}
const getControllerReducer = (keyboard: typeof baseKeyboard): React.Reducer<
  typeof initialcontroller,
  { key: KeyboardEvent['key'], switch: boolean }
> => {
  return (state, action) => {
    const setMoveDirect = (direct: 'x' | 'y' | 'z', value: number) => {
      if (action.switch) {
        state.direction[direct] = value
      } else {
        const reverseKey = getReverseDirection(action.key as keyof typeof keyboard, keyboard)
        const isReverseKeyPressing = state.keyboardStatus[reverseKey]
        if (isReverseKeyPressing) {
          state.direction[direct] = -1 * value
        } else {
          state.direction[direct] = 0
        }
      }
    }

    switch (action.key) {
      case keyboard.front:
        setMoveDirect('z', 1)
        break
      case keyboard.right:
        setMoveDirect('x', -1)
        break
      case keyboard.back:
        setMoveDirect('z', -1)
        break
      case keyboard.left:
        setMoveDirect('x', 1)
        break
      default:
    }
    state.keyboardStatus[action.key] = action.switch

    const rotations = []
    if (state.direction.x > 0) { rotations.push(120) }
    if (state.direction.x < 0) { rotations.push(240) }
    if (state.direction.z > 0) { rotations.push(0) }
    if (state.direction.z < 0) { rotations.push(180) }
    if (rotations.length) {
      state.rotation = rotations.reduce((total, item) => mergeDeg(total, item))
    }

    return state
  }
}

interface Props {
  src: string
  action?: string
}

const Player: FC<Props> = ({ src }) => {
  const keyboard = useSelector(state => state.keyboard)
  const [controller, dispatChcontroller] = useReducer(getControllerReducer(keyboard), initialcontroller)

  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  const onKeydown = (e: KeyboardEvent) => dispatChcontroller({ key: e.key, switch: true })
  const onKeyup = (e: KeyboardEvent) => dispatChcontroller({ key: e.key, switch: false })
  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)
    return () => {
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('keyup', onKeyup)
    }
  }, [])

  const meshRef = useRef<Mesh>(null!)
  useFrame((_, delta) => {
    if (!meshRef.current) { return }

    meshRef.current.position.x += controller.direction.x * delta
    meshRef.current.position.y += controller.direction.y * delta
    meshRef.current.position.z += controller.direction.z * delta

    meshRef.current.rotation.y = controller.rotation * Math.PI / 180

    if (actions.walk) {
      const isWalking = [keyboard.front, keyboard.left, keyboard.back, keyboard.right]
        .some(key => controller.keyboardStatus[key])
      if (isWalking) {
        actions.walk.play()
      } else {
        actions.walk.stop()
      }
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <primitive object={gltf.scene} />
      </mesh>
    </>
  )
}

export default Player
