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
        <button onClick={onAttack} className='btn'>我方攻擊</button>
        <button onClick={onChange} className='btn'>敵方攻擊</button>
      </div>
    </>
  )
}

export default Controller
