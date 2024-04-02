import Tab from '@app/common/components/ui/tab'
import { AllyCharacter } from '@game/characters/ally'
import React, { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Base from './base'
import { twMerge } from 'tailwind-merge'

const TAB_OPTIONS = ['詳情', '異常捕獲', '裝飾器', '參數調整', '背景故事']

interface Props {
  character: AllyCharacter
}

const CharacterListTab: FC<Props> = ({ character }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = useMemo(
    () => searchParams.get('tab') ?? TAB_OPTIONS[0],
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
        options={TAB_OPTIONS}
        className='w-1/2 overflow-hidden'
      >
        <div className={twMerge(
          'absolute transition-all',
          tab === TAB_OPTIONS[0] ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
        <div className={twMerge(
          'absolute transition-all',
          tab === TAB_OPTIONS[1] ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
        <div className={twMerge(
          'absolute transition-all',
          tab === TAB_OPTIONS[2] ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
        <div className={twMerge(
          'absolute transition-all',
          tab === TAB_OPTIONS[3] ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
        <div className={twMerge(
          'absolute transition-all',
          tab === TAB_OPTIONS[4] ? 'left-0 opacity-100' : 'left-[100vw] opacity-0'
        )}>
          <Base character={character} />
        </div>
      </Tab>
    </>
  )
}

export default CharacterListTab
