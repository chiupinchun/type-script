import Tab from '@app/common/components/ui/tab'
import { AllyCharacter } from '@game/characters/ally'
import React, { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Base from './base'

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
        className='px-2 w-1/2'
      >
        {tab === TAB_OPTIONS[0] && <Base character={character} />}
        {tab === TAB_OPTIONS[1] && <div>異常捕獲</div>}
        {tab === TAB_OPTIONS[2] && <div>裝飾器</div>}
        {tab === TAB_OPTIONS[3] && <div>參數調整</div>}
        {tab === TAB_OPTIONS[4] && <div>背景故事</div>}
      </Tab>
    </>
  )
}

export default CharacterListTab
