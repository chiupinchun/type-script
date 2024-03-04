import { Html } from '@react-three/drei'
import React, { FC, useEffect, useReducer } from 'react'
import { useSelector } from '@/store'
import { getActionReducer, initialData } from './actionReducer'
import VirtualKeyboard from '../../helper/virtualKeyboard'
import Movable, { MovableCtx } from '@/components/models/movable'
import { DASH_SPEED } from '@/game/constants/battle'

interface Props {
  src: string
  rawPosition: [number, number, number]
}

const Player: FC<Props> = ({ ...props }) => {
  const keyboard = useSelector(state => state.keyboard)

  const [actionState, dispatchActionState] = useReducer(
    getActionReducer(keyboard),
    initialData
  )

  const onKeydown = ({ key }: KeyboardEvent) => {
    dispatchActionState({ key, switch: true })
  }
  const onKeyup = ({ key }: KeyboardEvent) => {
    dispatchActionState({ key, switch: false })
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
      dispatchActionState({
        key: 'update',
        switch: false,
        newState: { acceleration: initialData.acceleration }
      })
    }
    if (ctx.action === 'attack') {
      dispatchActionState({
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
        direction={actionState.direction}
        acceleration={actionState.acceleration}
        action={actionState.action}
        onNextFrame={onNextFrame}
        isPlayer
      />
    </>
  )
}

export default Player
