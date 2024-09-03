export const clearLocalStorage = (excludedKey?: string) => {
  if (!excludedKey || typeof excludedKey !== "string") {
    localStorage.clear()
    return
  }

  const allKeys: string[] = Object.keys(localStorage)
  const keysToKeep: string[] = allKeys.filter((key) =>
    key.startsWith(excludedKey)
  )

  const valuesToKeep: Record<string, string> = {}

  keysToKeep.forEach((key) => {
    const value = localStorage.getItem(key)
    if (value !== null) {
      valuesToKeep[key] = value
    }
  })

  localStorage.clear()

  Object.keys(valuesToKeep).forEach((key) => {
    localStorage.setItem(key, valuesToKeep[key])
  })
}
