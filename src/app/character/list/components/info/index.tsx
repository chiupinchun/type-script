import Tab from '@app/common/components/ui/tab'
import { AllyCharacter } from '@game/characters/ally'
import React, { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Base from './base'
import { twMerge } from 'tailwind-merge'

enum TabOptions {
  base = '詳情',
  catching = '異常捕獲',
  decorator = '裝飾器',
  parameter = '參數調整',
  story = '背景故事'
}

interface Props {
  character: AllyCharacter
}

const CharacterListTab: FC<Props> = ({ character }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = useMemo(
    () => searchParams.get('tab') ?? TabOptions.base,
    [searchParams]
  )

  const handleTabChange = (tab: string) => {
    searchParams.set('tab', tab)
    setSearchParams(searchParams)
  }

  return (
    <>
      <Tab
        value={tab}
        onChange={handleTabChange}
        options={Object.values(TabOptions)}
        className='w-1/2 overflow-hidden'
      >
        <div className={twMerge(
          'absolute transition-all',
          tab === TabOptions.base ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
        <div className={twMerge(
          'absolute transition-all',
          tab === TabOptions.catching ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          努力開發中(。-`ω-)ノ
        </div>
        <div className={twMerge(
          'absolute transition-all',
          tab === TabOptions.decorator ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
        <div className={twMerge(
          'absolute transition-all',
          tab === TabOptions.parameter ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
        <div className={twMerge(
          'absolute transition-all',
          tab === TabOptions.story ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
      </Tab>
    </>
  )
}

export default CharacterListTab
