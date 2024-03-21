import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    name: '',
  },
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName } = counterSlice.actions

export default counterSlice.reducer