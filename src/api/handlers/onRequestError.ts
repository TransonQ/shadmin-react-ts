import { AxiosError } from "axios"

export const onRequestError = (error: AxiosError) => {
  console.error("onRequestError", error)

  return Promise.reject(error)
}
