import { ModelProgress } from '@/types/model'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { FC, useEffect, useRef } from 'react'
import { Mesh } from 'three'

export interface MovableCtx {
  src: string
  position: [number, number, number]
  rotation: number
  progresses: ModelProgress[]
  setProgresses: (progresses: MovableCtx['progresses']) => void
}

const Movable: FC<MovableCtx> = ({
  src, position,
  rotation = 90,
  progresses,
  setProgresses
}) => {

  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  const meshRef = useRef<Mesh>(null!)

  useEffect(() => {
    actions.standby?.play()
  }, [])

  useFrame((ctx, delta) => {
    if (!meshRef.current) { return }

    const notExecProgresses: ModelProgress[] = []
    progresses.forEach(progress => {
      if (+new Date() >= progress.timestamp) {
        progress.action(ctx, delta)
      } else {
        notExecProgresses.push(progress)
      }
    })

    setProgresses(notExecProgresses)
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
