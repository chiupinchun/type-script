import Tab from '@app/common/components/ui/tab'
import React, { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const TAB_OPTIONS = ['資訊', '異常捕獲', '裝飾器', '參數調整']

interface Props { }

const CharacterListTab: FC<Props> = () => {
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
      >
        {tab === TAB_OPTIONS[0] && <div>資訊</div>}
        {tab === TAB_OPTIONS[1] && <div>異常捕獲</div>}
        {tab === TAB_OPTIONS[2] && <div>裝飾器</div>}
        {tab === TAB_OPTIONS[3] && <div>參數調整</div>}
      </Tab>
    </>
  )
}

export default CharacterListTab
