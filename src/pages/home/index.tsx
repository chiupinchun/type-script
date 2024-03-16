import React, { FC, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Movable from '@/components/models/movable'
import Grass from '@/components/models/field-items/grass'
import Field from '@/components/models/field'
import { ModelProgress } from '@/types/model'
import { BATTLE_FIELD_POSITION, BATTLE_FIELD_RANGE } from '@/game/constants/battle'

interface Props { }

const Home: FC<Props> = () => {
  const [allyProgresses, setAllyProgresses] = useState<ModelProgress[]>([])
  const [enemyProgresses, setEnemyProgresses] = useState<ModelProgress[]>([])

  return (
    <>
      <div className='h-screen'>
        <Canvas
          camera={{ position: [0, 2.5, -5] }}
        >
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

          <Movable
            src='/models/magic-spirit.glb'
            position={[-2.5, 0, 5]}
            rotation={150}
            progresses={allyProgresses}
            setProgresses={setAllyProgresses}
          />
          <Movable
            src='/models/slime.glb'
            position={[2.5, 0, -2.5]}
            rotation={-30}
            progresses={enemyProgresses}
            setProgresses={setEnemyProgresses}
          />

          <Field position={BATTLE_FIELD_POSITION} range={BATTLE_FIELD_RANGE} FieldItem={Grass} />

        </Canvas>
      </div>
    </>
  )
}

export default Home
