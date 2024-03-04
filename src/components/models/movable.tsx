import { BASE_ATTACK_SPEED } from '@/game/constants/battle'
import { IMovingController } from '@/types/model'
import { switchAction } from '@/utils/animate'
import { offsetToDeg } from '@/utils/direction'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { FC, useEffect, useRef } from 'react'
import { Mesh } from 'three'

export interface MovableCtx extends Partial<IMovingController> {
  src: string
  rawPosition: [number, number, number]

  isPlayer?: true

  onNextFrame?: (ctx: MovableCtx) => void
}

const Movable: FC<MovableCtx> = ({
  src, rawPosition,
  direction = { x: 0, y: 0, z: 0 },
  acceleration = 1,
  action,
  isPlayer,
  onNextFrame = () => { }
}) => {

  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  const meshRef = useRef<Mesh>(null!)

  const attackTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    actions.standby?.play()
  }, [])

  useFrame(({ camera }, delta) => {
    if (!meshRef.current) { return }

    switch (action) {
      case 'standby':
        // switchAction(actions, 'standby')
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
      const deltaX = direction.x * acceleration * delta
      meshRef.current.position.x += deltaX
      if (isPlayer) { camera.position.x += deltaX }
    }
    if (direction.y) {
      const deltaY = direction.y * acceleration * delta
      meshRef.current.position.y += deltaY
      if (isPlayer) { camera.position.y += deltaY }
    }
    if (direction.z) {
      const deltaZ = direction.z * acceleration * delta
      meshRef.current.position.z += deltaZ
      if (isPlayer) { camera.position.z += deltaZ }
    }
    if (direction.x || direction.z) {
      switchAction(actions, 'walk')
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
      <mesh position={rawPosition} ref={meshRef} rotation={[0, 90 * Math.PI / 2, 0]}>
        <primitive object={gltf.scene} />
      </mesh>
    </>
  )
}

export default Movable
