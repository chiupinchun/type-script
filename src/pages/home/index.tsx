import React, { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import Movable from '@/components/models/movable'
import Grass from '@/components/models/field-items/grass'
import Field from '@/components/models/field'

interface Props { }

const Home: FC<Props> = () => {

  return (
    <>
      <div className='h-screen'>
        <Canvas
          camera={{
            // position: [-10, 5, 10] // 戰棋視角
            position: [0, 2.5, -5]
          }}
        >
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

          <Movable src='/models/magic-spirit.glb' rawPosition={[-2.5, 0, 5]} rawRotation={150} />
          <Movable src='/models/slime.glb' rawPosition={[2.5, 0, -2.5]} rawRotation={-30} />

          <Field position={[0, 0, 0]} range={[100, 100]} FieldItem={Grass} />

        </Canvas>
      </div>
    </>
  )
}

export default Home
