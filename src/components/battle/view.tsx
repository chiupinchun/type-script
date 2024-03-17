import React, { FC } from 'react'
import Movable from '../models/character'
import { ALLY_POSITION, BATTLE_FIELD_POSITION, BATTLE_FIELD_RANGE, ENEMY_POSITION, RAW_CAMERA_POSITION } from '@/game/constants/battle'
import { Canvas } from '@react-three/fiber'
import Field from '../models/field'
import Grass from '../models/field-items/grass'
import { ModelProgress } from '@/hooks/useModelProgress'

interface Props {
  allyProgress: ModelProgress | null
  enemyProgress: ModelProgress | null
}

const BattleView: FC<Props> = ({ allyProgress, enemyProgress }) => {
  return (
    <>
      <Canvas
        camera={{ position: RAW_CAMERA_POSITION }}
      >
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
    </>
  )
}

export default BattleView
