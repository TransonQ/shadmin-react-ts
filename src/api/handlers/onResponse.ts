import type { AxiosResponse } from "axios"

export const onResponse = (response: AxiosResponse) => {
  if (response.config.responseType === "blob") {
    return response
  }

  return response.data
}
