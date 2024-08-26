function sleepDefault<T>(ms: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value as T), ms))
}

function sleepError(ms: number, ...args: any): Promise<any> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Sleep.Error")), ms)
  )
}

export const sleep = Object.assign(sleepDefault, { error: sleepError })
