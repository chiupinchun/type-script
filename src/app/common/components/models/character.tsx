import { ModelProgress } from '@/hooks/useModelProgress'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { FC, useEffect, useRef } from 'react'
import { Mesh } from 'three'

export interface MovableCtx {
  src: string
  position: [number, number, number]
  rotation: number
  progress: ModelProgress | null
}

const Movable: FC<MovableCtx> = ({
  src, position,
  rotation = 90,
  progress
}) => {

  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  const meshRef = useRef<Mesh>(null!)

  useEffect(() => {
    actions.standby?.play()
  }, [actions.standby])

  useFrame((ctx) => {
    if (!meshRef.current) { return }

    if (progress) {
      progress.effect?.(meshRef.current, ctx)

      if (progress.action) {
        Object.values(actions).forEach(action => action?.stop())
        const currentAction = actions[progress.action] ?? actions.standby
        currentAction!.play()
      }
    }
  })

  return (
    <>
      <mesh position={position} ref={meshRef} rotation={[0, rotation * Math.PI / 180, 0]}>
        <primitive object={gltf.scene} />
      </mesh>
    </>
  )
}

export default Movable
