import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  front: 'w',
  left: 'a',
  back: 's',
  right: 'd',

  attack: 'j',
  dash: 'k'
}
export const baseKeyboard = initialState
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setKey(
      state,
      action: PayloadAction<
        {
          key: keyof typeof initialState,
          value: KeyboardEvent['key']
        }
      >
    ) {
      state[action.payload.key] = action.payload.value
      localStorage.setItem('keyboard', JSON.stringify(state))
    },
    setAllKeys(state, action: PayloadAction<typeof initialState>) {
      Object.assign(state, action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setKey, setAllKeys } = counterSlice.actions

export default counterSlice.reducer