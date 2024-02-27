import React, { FC, useEffect, useState } from 'react'

interface Props { }

const VirtualKeyboard: FC<Props> = () => {
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)
  const [front, setFront] = useState(false)
  const [back, setBack] = useState(false)

  const [attack, setAttack] = useState(false)
  const [dash, setDash] = useState(false)

  const onKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
        setFront(true)
        break
      case 'a':
        setLeft(true)
        break
      case 's':
        setBack(true)
        break
      case 'd':
        setRight(true)
        break
      case 'j':
        setAttack(true)
        break
      case 'k':
        setDash(true)
        break
    }
  }
  const onKeyup = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
        setFront(false)
        break
      case 'a':
        setLeft(false)
        break
      case 's':
        setBack(false)
        break
      case 'd':
        setRight(false)
        break
      case 'j':
        setAttack(false)
        break
      case 'k':
        setDash(false)
        break
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('keyup', onKeyup)
    }
  })

  return (
    <>
      <ul className='flex gap-5'>
        <div>
          <div className='flex justify-center'>
            <li className='p-2 w-10 border text-center' style={{ color: front ? 'red' : '' }}>W</li>
          </div>
          <div className='flex gap-2 mt-2'>
            <li className='p-2 w-10 border text-center' style={{ color: left ? 'red' : '' }}>A</li>
            <li className='p-2 w-10 border text-center' style={{ color: back ? 'red' : '' }}>S</li>
            <li className='p-2 w-10 border text-center' style={{ color: right ? 'red' : '' }}>D</li>
          </div>
        </div>
        <div className='flex items-end'>
          <div className='flex gap-2'>
            <li className='p-2 w-10 border text-center' style={{ color: attack ? 'red' : '' }}>J</li>
            <li className='p-2 w-10 border text-center' style={{ color: dash ? 'red' : '' }}>K</li>
          </div>
        </div>
      </ul>
    </>
  )
}

export default VirtualKeyboard
