import { sleep } from "@/lib"
import useSWR from "swr"

const fakeData = {
  id: "transon",
  usename: "Transon",
  avatar: "/shadmin.svg",
  role: "admin",
  email: "exmaple@admin.com",
}

export const useAuth = () => {
  return useSWR({ key: "auth" }, () => sleep(1000, fakeData))
}
