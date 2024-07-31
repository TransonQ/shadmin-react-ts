import { getAccess } from "@/api"
import { Bills, UpdateBill } from "@/pages"
import { RouteObject } from "react-router-dom"
import useSWR from "swr"

interface RouteConfig {
  path: string
  element: JSX.Element
  errorElement: JSX.Element
  requiredAccess: string
}

export const routeConfigs: RouteConfig[] = [
  {
    path: "/app/a",
    element: <Bills />,
    errorElement: <div>{"Error /Bills"}</div>,
    requiredAccess: "app/example/bill/view",
  },
  {
    path: "/app/b/:id?",
    element: <UpdateBill />,
    errorElement: <div>{"Error /UpdateBill"}</div>,
    requiredAccess: "app/example/form/update",
  },
]

export function useDynamicRoutes() {
  const dynamicRoutes: RouteObject[] = []
  const r = useSWR({ key: "ACCESS" }, ({ key }) => getAccess())

  if (r.data) {
    const access = r.data.access
    /** Suppose the permission response is as follows:
      {
        "app/example/bill/view": true,
        "app/example/form/update": true
      }
    */

    // Filter out dynamic routes without permissions
    const routes = routeConfigs
      .filter((route) => access[route.requiredAccess])
      .map(({ requiredAccess, ...route }) => route) // Remove the requiredAccess attribute

    dynamicRoutes.push(...routes)
  }

  return {
    dynamicRoutes,
    isLoading: r.isLoading,
    isValidating: r.isValidating,
    error: r.error,
  }
}
