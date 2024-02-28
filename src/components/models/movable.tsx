import { BASE_ATTACK_SPEED } from '@/game/constants/battle'
import { IMovingController } from '@/types/player'
import { switchAction } from '@/utils/animate'
import { offsetToDeg } from '@/utils/direction'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { FC, useRef } from 'react'
import { Mesh } from 'three'

export interface MovableCtx extends IMovingController {
  src: string
  rawPosition: [number, number, number]

  onNextFrame?: (ctx: MovableCtx) => void
}

const Movable: FC<MovableCtx> = ({
  src, rawPosition, direction, acceleration, action,
  onNextFrame = () => { }
}) => {

  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  const meshRef = useRef<Mesh>(null!)

  const attackTimeout = useRef<NodeJS.Timeout>()

  useFrame((_, delta) => {
    if (!meshRef.current) { return }

    switch (action) {
      case undefined:
        switchAction(actions, 'standby')
        break
      case 'attack':
        if (attackTimeout.current) { clearTimeout(attackTimeout.current) }
        switchAction(actions, 'attack')
        attackTimeout.current = setTimeout(() => {
          actions.attack?.stop()
        }, BASE_ATTACK_SPEED)
        break
    }

    if (direction.x) {
      meshRef.current.position.x += direction.x * acceleration * delta
    }
    if (direction.y) {
      meshRef.current.position.y += direction.y * acceleration * delta
    }
    if (direction.z) {
      meshRef.current.position.z += direction.z * acceleration * delta
    }
    if (direction.x || direction.z) {
      actions.walk?.play()
    } else {
      actions.walk?.stop()
    }

    const deg = offsetToDeg(direction.x, direction.z)
    if (deg !== null) { meshRef.current.rotation.y = deg }

    onNextFrame({
      src, rawPosition, direction, acceleration, action
    })
  })

  return (
    <>
      <mesh position={rawPosition} ref={meshRef}>
        <primitive object={gltf.scene} />
      </mesh>
    </>
  )
}

export default Movable
