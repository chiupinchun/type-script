import React, { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import Player from '@/components/models/player'
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
            position: [0, 5, -10]
          }}
        >
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

          <Player src='/models/magic-spirit.glb' rawPosition={[0, 0, 0]} />
          <Movable src='/models/slime.glb' rawPosition={[5, 0, 0]} action='standby' />

          <Field position={[0, 0, 0]} range={[100, 100]} FieldItem={Grass} />

        </Canvas>
      </div>
    </>
  )
}

export default Home
