import type { InternalAxiosRequestConfig } from "axios"

export const onRequest = (config: InternalAxiosRequestConfig) => {
  return config
}
