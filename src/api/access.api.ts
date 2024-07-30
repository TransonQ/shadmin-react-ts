import { ax } from "./instances"

export const getAccess = (): Promise<any> =>
  ax.request({
    method: "GET",
    url: "/access",
  })
