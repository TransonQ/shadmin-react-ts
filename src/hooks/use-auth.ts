import { sleep } from "@/lib"
import useSWR from "swr"

const fakeData = {
  usename: "Transon",
  role: "admin",
  email: "exmaple@admin.com",
}

export const useAuth = () => {
  return useSWR({ key: "auth" }, () => sleep(1000, fakeData))
}
