import { useDispatch, useSelector } from '@/store'
import { setName } from '@/store/user'
import React, { FC } from 'react'

interface Props { }

const Home: FC<Props> = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <><div className='text-pink-500'>
      home {user.name}
      <button onClick={() => dispatch(setName(user.name + '!'))}>add '!'</button>
    </div></>
  )
}

export default Home
