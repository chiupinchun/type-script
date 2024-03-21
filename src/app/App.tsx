import React, { FC } from 'react'

interface Props {
  children: React.ReactNode
}

const Page: FC<Props> = ({ children }) => {

  return (
    <>
      {children}
    </>
  )
}

export default Page
