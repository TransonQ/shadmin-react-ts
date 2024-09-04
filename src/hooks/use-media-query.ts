import { useState } from "react"
import { useIsomorphicEffect } from "./use-isomorphic-effect"

const IS_SERVER = typeof window === "undefined"

interface UseMediaQueryConfig {
  /**
   * @param defaultValue
   * @default false
   */
  defaultValue?: boolean
  /**
   * @param initializeWithValue
   * @default true
   * 如果是`true`(默认值)，hook 会初始化读取媒体查询。
   * 在SSR中，应该将其设置为`false`，最初返回`options.defaultValue`或`false`。
   */
  initializeWithValue?: boolean
}

export const useMediaQuery = (
  query: string,
  config: UseMediaQueryConfig = {}
) => {
  const { defaultValue = false, initializeWithValue = true } = config

  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  function handleChange() {
    setMatches(getMatches(query))
  }

  useIsomorphicEffect(() => {
    const matchMedia = window.matchMedia(query)

    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}
