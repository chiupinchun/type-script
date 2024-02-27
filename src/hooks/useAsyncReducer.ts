import { Reducer, ReducerState, useReducer } from "react"

// eslint-disable-next-line
export const useAsyncReducer = <R extends Reducer<any, any>>(
  reducer: R,
  initializerArg: ReducerState<R>
) => {
  const [state, dispatch] = useReducer(reducer, initializerArg)

  const dispatchAsync = <T = unknown>(
    asyncFn: () => Promise<T>,
    transformAction: (res: T) => React.ReducerAction<R>
  ) => {
    asyncFn().then((res) => {
      const action = transformAction(res)
      dispatch(action)
    })
  }

  return [state, dispatch, dispatchAsync] as const
}