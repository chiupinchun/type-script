import { configureStore } from '@reduxjs/toolkit'
import user from './user'
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector
} from 'react-redux'

export const store = configureStore({
  reducer: {
    user,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const useSelector = _useSelector.withTypes<RootState>()

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useDispatch = _useDispatch.withTypes<AppDispatch>()