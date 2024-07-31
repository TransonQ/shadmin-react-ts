import { Loading } from "@/components"
import { useDynamicRoutes } from "@/hooks"
import { matchRoutes, useLocation } from "react-router-dom"

export function WildCardPage() {
  const location = useLocation()
  const { dynamicRoutes, isLoading } = useDynamicRoutes()

  if (isLoading) {
    return (
      <div>
        <Loading />
        <h1>{"loading"}</h1>
      </div>
    )
  }

  const notFound = !matchRoutes(dynamicRoutes, location)

  if (notFound) {
    return (
      <div>
        <h1>{"Not Found"}</h1>
      </div>
    )
  }
}
