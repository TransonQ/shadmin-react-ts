import type { AxiosError } from "axios"

export const onResponseError = (error: AxiosError) => {
  return Promise.reject(error?.response || error)
}
