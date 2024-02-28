import { baseKeyboard } from "@/store/keyboard"
import { IMovingController } from "@/types/player"
import { getReverseDirection, mergeDeg } from "@/utils/direction"

export const initialData: IMovingController & {
  keyboardStatus: Record<KeyboardEvent['key'], boolean>
} = {
  keyboardStatus: {},
  direction: { x: 0, y: 0, z: 0 },
  rotation: 0
}

export const getDirectReducer = (keyboard: typeof baseKeyboard): React.Reducer<
  typeof initialData,
  { key: KeyboardEvent['key'], switch: boolean }
> => {
  return (state, action) => {
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

    const rotations = []
    if (state.direction.x > 0) { rotations.push(120) }
    if (state.direction.x < 0) { rotations.push(240) }
    if (state.direction.z > 0) { rotations.push(0) }
    if (state.direction.z < 0) { rotations.push(180) }
    if (rotations.length) {
      state.rotation = rotations.reduce((total, item) => mergeDeg(total, item))
    }

    return state
  }
}