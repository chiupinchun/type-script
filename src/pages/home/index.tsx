import React, { FC, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Movable from '@/components/models/character'
import Grass from '@/components/models/field-items/grass'
import Field from '@/components/models/field'
import { ALLY_POSITION, BATTLE_FIELD_POSITION, BATTLE_FIELD_RANGE, ENEMY_POSITION, RAW_CAMERA_POSITION } from '@/game/constants/battle'
import { Html } from '@react-three/drei'
import { ModelProgress, useModelProgress } from '@/hooks/useModelProgress'

interface Props { }

const Home: FC<Props> = () => {
  const [allyProgress, setAllyProgress] = useState<ModelProgress | null>(null)
  const [enemyProgress, setEnemyProgress] = useState<ModelProgress | null>(null)

  const allyProgresses = useModelProgress(
    () => setAllyProgress(progress => progress ? progress.next : null),
    ALLY_POSITION,
    ENEMY_POSITION.map(num => num * 0.8) as [number, number, number]
  )
  const enemyProgresses = useModelProgress(
    () => setEnemyProgress(process => process ? process.next : null),
    ENEMY_POSITION,
    ALLY_POSITION.map(num => num * 0.8) as [number, number, number]
  )

  return (
    <>
      <div className='h-screen'>
        <Canvas
          camera={{ position: RAW_CAMERA_POSITION }}
        >

          <Html>
            <div className='w-max space-x-2'>
              <button onClick={() => setAllyProgress(allyProgresses.closeAttack)} className='btn'>我方攻擊</button>
              <button onClick={() => setEnemyProgress(enemyProgresses.closeAttack)} className='btn'>敵方攻擊</button>
            </div>
          </Html>

          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

          <Movable
            src='/models/slime.glb'
            position={ENEMY_POSITION}
            rotation={150}
            progress={enemyProgress}
          />
          <Movable
            src='/models/magic-spirit.glb'
            position={ALLY_POSITION}
            rotation={-30}
            progress={allyProgress}
          />

          <Field position={BATTLE_FIELD_POSITION} range={BATTLE_FIELD_RANGE} FieldItem={Grass} />

        </Canvas>
      </div>
    </>
  )
}

export default Home
