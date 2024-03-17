import React, { FC, useEffect, useState } from 'react'
import { ALLY_POSITION, ENEMY_POSITION } from '@/game/constants/battle'
import { ModelProgress, useModelProgress } from '@/hooks/useModelProgress'
import Controller from '@/components/battle/controller'
import AllyHp from '@/components/battle/allyHp'
import BattleView from '@/components/battle/view'
import Elegance from '@/components/battle/elegance'
import EnemyHp from '@/components/battle/enemyHp'
import Setting from '@/components/battle/setting'

interface Props { }

const Home: FC<Props> = () => {
  const [allyProgress, setAllyProgress] = useState<ModelProgress | null>(null)
  const [enemyProgress, setEnemyProgress] = useState<ModelProgress | null>(null)
  const [isUiHide, setIsUiHide] = useState(false)

  useEffect(() => {
    const progressing = allyProgress !== null || enemyProgress !== null
    setIsUiHide(progressing)
  }, [allyProgress, enemyProgress])

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
      <div className='reactive h-screen'>
        <BattleView
          allyProgress={allyProgress}
          enemyProgress={enemyProgress}
        />
        <div className='absolute right-5 bottom-5'>
          {isUiHide || <Controller
            onAttack={() => setAllyProgress(allyProgresses.closeAttack)}
            onChange={() => setEnemyProgress(enemyProgresses.closeAttack)}
          />}
        </div>
        <div className='absolute left-5 bottom-5'>
          {isUiHide || <AllyHp />}
        </div>
        <div className='absolute top-1 flex justify-between px-5 w-full'>
          {isUiHide || <>
            <Elegance />
            <EnemyHp />
            <Setting />
          </>}
        </div>
      </div>
    </>
  )
}

export default Home
