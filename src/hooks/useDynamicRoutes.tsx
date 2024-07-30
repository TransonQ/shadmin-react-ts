import { getAccess } from "@/api"
import { Bills, UpdateBill } from "@/pages"
import { useCallback, useEffect, useState } from "react"
import { RouteObject } from "react-router-dom"

export function useDynamicRoutes() {
  const [loading, setLoading] = useState(true)
  const [dynamicRoutes, setDynamicRoutes] = useState<RouteObject[]>([])

  const fetchDynamicRoutes = useCallback(async () => {
    const res = await getAccess()
    console.log("getAccess: ", res)

    setDynamicRoutes([
      {
        path: "/app/a",
        element: <Bills />,
        errorElement: <div>{"Error /a"}</div>,
      },
      {
        path: "/app/b/:id?",
        element: <UpdateBill />,
        errorElement: <div>{"Error /b"}</div>,
      },
    ])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchDynamicRoutes()
  }, [fetchDynamicRoutes])

  return { dynamicRoutes, loading }
}
