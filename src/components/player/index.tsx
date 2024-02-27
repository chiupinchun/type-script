import { Html, useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, useEffect, useReducer, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useSelector } from '@/store'
import { getControllerReducer, initialcontroller } from './moveReducer'
import VirtualKeyboard from '../helper/virtualKeyboard'

interface Props {
  src: string
  action?: string
}

const Player: FC<Props> = ({ src }) => {
  const keyboard = useSelector(state => state.keyboard)
  const [controller, dispatchController] = useReducer(getControllerReducer(keyboard), initialcontroller)

  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  const onKeydown = (e: KeyboardEvent) => dispatchController({ key: e.key, switch: true })
  const onKeyup = (e: KeyboardEvent) => dispatchController({ key: e.key, switch: false })
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
