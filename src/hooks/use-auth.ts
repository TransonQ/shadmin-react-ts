import useSWR from "swr"

export const useAuth = () => {
  return useSWR({ key: "auth" }, () =>
    fetch("/api/auth").then((res) => res.json())
  )
}
