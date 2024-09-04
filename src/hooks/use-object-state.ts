import type { Reducer } from "react"
import { useReducer } from "react"

type Updater<T> = (prevState: T) => T
type UpdateFnOrValue<T> = Updater<T> | Partial<T>
type UseObjectStateReturn<T> = [T, (update: UpdateFnOrValue<T>) => void]

export function useObjectState<T>(initialState: T): UseObjectStateReturn<T> {
  if (!isObject(initialState)) {
    throw new Error("[useObjectState]: initialState must be an object")
  }

  const [state, dispatch] = useReducer(
    reducer as Reducer<T, Partial<T>>,
    initialState
  )

  const setObjectState = (callbckOrValue: UpdateFnOrValue<T>) => {
    if (isUpdateFn(callbckOrValue)) {
      const callback = callbckOrValue
      const value = callback(state)
      dispatch(value)
    } else {
      const value = callbckOrValue
      dispatch(value)
    }
  }

  return [state, setObjectState]
}

function isUpdateFn<T>(update: UpdateFnOrValue<T>): update is Updater<T> {
  return typeof update === "function"
}

function isObject(obj: any) {
  return (
    Object.prototype.toString.call(obj).toLowerCase().slice(8, -1) === "object"
  )
}

function reducer<T>(data: T, partialData: Partial<T>): T {
  return { ...data, ...partialData }
}
