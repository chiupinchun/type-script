import { baseKeyboard } from "@/store/keyboard"
import { ISkillController } from "@/types/player"

export const initialData: ISkillController = {
  action: undefined
}

export const getDirectReducer = (keyboard: typeof baseKeyboard): React.Reducer<
  typeof initialData,
  {
    type: 'keydown' | 'update',
    key?: KeyboardEvent['key'],
    now?: Date,
    newState?: Partial<ISkillController>
  }
> => {
  return (state, action) => {
    if (action.type === 'update') {
      return Object.assign(state, action.newState)
    }

    switch (action.key) {
      case keyboard.dash:
        state.action = 'dash'
        break
      case keyboard.attack:
      case keyboard.sk1:
      case keyboard.sk2:
      case keyboard.sk3:
        state.action = 'attack'
        break
    }

    return state
  }
}