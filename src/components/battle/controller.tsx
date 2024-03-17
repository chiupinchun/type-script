import React, { FC } from 'react'

interface Props {
  onAttack: () => void
  onChange: () => void
}

const Controller: FC<Props> = ({
  onAttack, onChange
}) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <button onClick={onAttack} className='btn large rounded'>攻擊</button>
        <button onClick={onChange} className='btn large rounded'>換人</button>
      </div>
    </>
  )
}

export default Controller
