import { Html } from '@react-three/drei'
import React, { FC, useEffect, useReducer } from 'react'
import { useSelector } from '@/store'
import { getDirectReducer, initialData } from './moveReducer'
import VirtualKeyboard from '../../helper/virtualKeyboard'
import Movable, { MovableCtx } from '@/components/models/movable'
import { DASH_SPEED } from '@/game/constants/battle'

interface Props {
  src: string
  rawPosition: [number, number, number]
}

const Player: FC<Props> = ({ ...props }) => {
  const keyboard = useSelector(state => state.keyboard)

  const [movingState, dispatchMovingState] = useReducer(
    getDirectReducer(keyboard),
    initialData
  )

  const onKeydown = ({ key }: KeyboardEvent) => {
    dispatchMovingState({ key, switch: true })
  }
  const onKeyup = ({ key }: KeyboardEvent) => {
    dispatchMovingState({ key, switch: false })
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)
    return () => {
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('keyup', onKeyup)
    }
  }, [])

  const onNextFrame = (ctx: MovableCtx) => {
    if (ctx.acceleration === DASH_SPEED) {
      dispatchMovingState({
        key: 'update',
        switch: false,
        newState: { acceleration: initialData.acceleration }
      })
    }
    if (ctx.action === 'attack') {
      dispatchMovingState({
        key: 'update',
        switch: false,
        newState: { action: 'standby' }
      })
    }
  }

  return (
    <>
      <Html>
        <VirtualKeyboard />
      </Html>
      <Movable {...props}
        direction={movingState.direction}
        acceleration={movingState.acceleration}
        action={movingState.action}
        onNextFrame={onNextFrame}
      />
    </>
  )
}

export default Player
