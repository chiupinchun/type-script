import React, { FC } from 'react'
import { ALLY_POSITION, BATTLE_FIELD_POSITION, BATTLE_FIELD_RANGE, ENEMY_POSITION, RAW_CAMERA_POSITION } from '@game/constants/battle-ui'
import { Canvas } from '@react-three/fiber'
import { ModelProgress } from '@app/common/hooks/useModelProgress'
import Movable from '@app/common/components/models/character'
import Field from '@app/common/components/models/field'
import Grass from '@app/common/components/models/field-items/grass'
import BasicEnv from '@app/common/components/models/basicEnv'

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
        <BasicEnv />

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
