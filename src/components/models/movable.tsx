import { actions } from '@/types/model'
import { switchAction } from '@/utils/animate'
import { offsetToDeg } from '@/utils/direction'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { FC, useRef } from 'react'
import { Mesh } from 'three'

interface Props {
  action?: actions
  src: string
  rawPosition: [number, number, number]
  direction: [number, number, number]
}

const Monster: FC<Props> = ({
  src, rawPosition, direction,
  action
}) => {
  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  const meshRef = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    if (!meshRef.current) { return }

    switch (action) {
      case undefined:
        switchAction(actions)
        break
      case 'attack':
        switchAction(actions, 'attack')
        break
    }

    if (direction[0]) {
      meshRef.current.position.x = direction[0] * delta
      actions.walk?.play()
    }
    if (direction[1]) {
      meshRef.current.position.y = direction[1] * delta
    }
    if (direction[2]) {
      meshRef.current.position.z = direction[2]
      actions.walk?.play()
    }

    const deg = offsetToDeg(direction[0], direction[2])
    if (deg !== null) { meshRef.current.rotation.y = deg }
  })

  return (
    <>
      <mesh position={rawPosition} ref={meshRef}>
        <primitive object={gltf.scene} />
      </mesh>
    </>
  )
}

export default Monster
