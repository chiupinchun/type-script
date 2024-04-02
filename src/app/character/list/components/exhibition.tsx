import BasicEnv from '@app/common/components/models/basicEnv'
import { useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { FC, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'

interface Props {
  src: string
}

const Model: FC<Props> = ({ src }) => {
  const gltf = useGLTF(src)
  const { actions } = useAnimations(gltf.animations, gltf.scene)

  useEffect(() => {
    actions.standby?.play()
  }, [actions])

  return (
    <mesh rotation={[0, Math.PI, 0]} position={[0, -1, 0]}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

const Exhibition: FC<Props> = ({ ...props }) => {

  return (
    <>
      <div className='w-2/5 h-full'>
        <Canvas
          camera={{
            position: [0, 1, -3]
          }}
        >
          <BasicEnv />
          <Model {...props} />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  )
}

export default Exhibition
