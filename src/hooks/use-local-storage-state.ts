import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"

interface UseLocalStorageStateConfig {
  /** 本地存储的key前缀: 用于标识不同用户标识之间的本地存储 */
  keyPrefix?: string
}

export function useLocalStorageState<T>(
  key: string,
  initialState: T,
  config?: UseLocalStorageStateConfig
): [T, Dispatch<SetStateAction<T>>] {
  const { keyPrefix } = config || {}
  const identifier = keyPrefix ? keyPrefix + "_" : ""
  const mergeKey = identifier + key

  const [state, setState] = useState<T>(getInitialValue(mergeKey, initialState))
  // 监听state的变化，更新localStorage中存储的值
  useEffect(() => {
    localStorage.setItem(mergeKey, JSON.stringify(state))
  }, [state, mergeKey])

  return [state, setState]
}

// 从localStorage中获取存储的值，如果不存在则使用初始状态
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
