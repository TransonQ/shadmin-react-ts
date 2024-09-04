import type { ColumnFiltersState } from "@tanstack/react-table"
import { useCallback, useEffect, useReducer } from "react"

type FiltersStore = { [key: string]: ColumnFiltersState }
type FiltersPayload = {
  key: string
  prevKey?: string
  filterState: ColumnFiltersState
}

export function useFilterStore(key: string) {
  /** 如果存在 localstorage, 读取数据 */
  const initialState = getInitialValue(key, {})
  const [filterStore, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(filterStore))
  }, [key, filterStore])

  const updateFilters = useCallback(({ key, filterState }: FiltersPayload) => {
    dispatch({
      type: "UPDATE",
      payload: {
        key,
        filterState,
      },
    })
  }, [])
  const deleteUpdateFilters = useCallback(
    ({ key, filterState }: FiltersPayload) => {
      dispatch({
        type: "DELETE",
        payload: {
          key,
          filterState,
        },
      })
    },
    []
  )
  const renameUpdateFilters = useCallback(
    ({ key, prevKey, filterState }: FiltersPayload) => {
      dispatch({
        type: "RENAME",
        payload: {
          key,
          prevKey,
          filterState,
        },
      })
    },
    []
  )

  return {
    filterStore,
    updateFilters,
    deleteUpdateFilters,
    renameUpdateFilters,
  }
}

function getInitialValue<T>(key: string, initialState: T): T {
  const storedValue = localStorage.getItem(key)
  if (storedValue && storedValue !== "undefined" && storedValue !== "null") {
    try {
      return JSON.parse(storedValue)
    } catch (error) {
      return initialState
    }
  }
  return initialState
}

const reducer = (
  data: FiltersStore,
  action: {
    type: "UPDATE" | "DELETE" | "RENAME"
    payload: FiltersPayload
  }
): FiltersStore => {
  switch (action.type) {
    case "UPDATE": {
      const { key, filterState } = action.payload
      return {
        ...data,
        [key]: filterState,
      }
    }
    case "DELETE": {
      const { key } = action.payload
      const newData = { ...data }
      delete newData[key]
      return newData
    }
    case "RENAME": {
      const { key, prevKey, filterState } = action.payload
      const newData = { ...data, [key]: filterState }
      if (typeof prevKey === "string") delete newData[prevKey]
      return newData
    }
    default:
      return data
  }
}
