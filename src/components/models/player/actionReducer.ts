import { DASH_SPEED } from "@/game/constants/battle"
import { baseKeyboard } from "@/store/keyboard"
import { IMovingController } from "@/types/model"
import { getReverseDirection } from "@/utils/direction"

export const initialData: IMovingController & {
  keyboardStatus: Record<KeyboardEvent['key'], boolean>
} = {
  keyboardStatus: {},
  direction: { x: 0, y: 0, z: 0 },
  acceleration: 1,
  action: 'standby'
}

export const getActionReducer = (keyboard: typeof baseKeyboard): React.Reducer<
  typeof initialData,
  {
    key: KeyboardEvent['key'] | 'update',
    switch: boolean,
    newState?: Partial<typeof initialData>
  }
> => {
  return (state, action) => {
    if (action.key === 'update') {
      return Object.assign(state, action.newState)
    }

    const setMoveDirect = (direct: 'x' | 'y' | 'z', value: number) => {
      if (action.switch) {
        state.direction[direct] = value
      } else {
        const reverseKey = getReverseDirection(action.key as keyof typeof keyboard, keyboard)
        const isReverseKeyPressing = state.keyboardStatus[reverseKey]
        if (isReverseKeyPressing) {
          state.direction[direct] = -1 * value
        } else {
          state.direction[direct] = 0
        }
      }
    }

    switch (action.key) {
      case keyboard.front:
        setMoveDirect('z', 1)
        break
      case keyboard.right:
        setMoveDirect('x', -1)
        break
      case keyboard.back:
        setMoveDirect('z', -1)
        break
      case keyboard.left:
        setMoveDirect('x', 1)
        break
    }
    state.keyboardStatus[action.key] = action.switch

    // skills only trigger when keydown
    if (action.switch) {
      switch (action.key) {
        case keyboard.attack:
        case keyboard.sk1:
        case keyboard.sk2:
        case keyboard.sk3:
          state.action = 'attack'
          break
        case keyboard.dash:
          state.acceleration = DASH_SPEED
          break
      }
    }

    return { ...state }
  }
}