import React, { FC, useEffect, useState } from 'react'
import { ALLY_POSITION, ENEMY_POSITION } from '@game/constants/battle-ui'
import { ModelProgress, useModelProgress } from '@app/common/hooks/useModelProgress'
import Controller from './components/controller'
import AllyHp from './components/allyHp'
import BattleView from './components/view'
import Elegance from './components/elegance'
import EnemyHp from './components/enemyHp'
import Setting from './components/setting'
import { SliceStr } from '@game/characters/string/slice'
import { fighterRoute } from '@game/parameters/fighter'

const parameter = fighterRoute.last
const sliceStr = new SliceStr(10, null, [], [parameter])
console.log(sliceStr)
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
      <div className='reactive h-screen md:text-xl'>
        <BattleView
          allyProgress={allyProgress}
          enemyProgress={enemyProgress}
        />
        {isUiHide || <div className='absolute top-1 flex justify-between px-5 w-full md:top-6 md:px-10'>
          <Elegance />
          <EnemyHp />
          <Setting />
        </div>}
        {isUiHide || <div className='absolute bottom-5 flex justify-between items-end px-5 w-full md:px-10 md:bottom-10'>
          <AllyHp />
          <Controller
            onAttack={() => setAllyProgress(allyProgresses.closeAttack)}
            onChange={() => setEnemyProgress(enemyProgresses.closeAttack)}
          />
        </div>}
      </div>
    </>
  )
}

export default Home
