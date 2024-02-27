import React, { FC, useEffect } from 'react'
import { useDispatch } from './store'
import { setAllKeys } from './store/keyboard'

interface Props {
  children: React.ReactNode
}

const Page: FC<Props> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const keyboardSetting = localStorage.getItem('keyboard')
    if (keyboardSetting) {
      try {
        dispatch(setAllKeys(JSON.parse(keyboardSetting)))
      } catch {
        alert('鍵盤設置發生錯誤！已初始化默認鍵盤設置。')
        localStorage.removeItem('keyboard')
      }
    }
  })

  return (
    <>
      {children}
    </>
  )
}

export default Page
