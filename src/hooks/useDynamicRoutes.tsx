import { getAccess } from "@/api"
import { Bills, UpdateBill } from "@/pages"
import { RouteObject } from "react-router-dom"
import useSWR from "swr"

export const registerRoutes = {
  table: {
    path: "/app/a",
    element: <Bills />,
    errorElement: <div>{"Error /UpdateBill"}</div>,
  },
  form: {
    path: "/app/b/:id?",
    element: <UpdateBill />,
    errorElement: <div>{"Error /UpdateBill"}</div>,
  },
}

export function useDynamicRoutes() {
  const dynamicRoutes: RouteObject[] = []

  const { data, error, isLoading, isValidating } = useSWR(
    { key: "ACCESS" },
    ({ key }) => getAccess()
  )

  const tableAccess = data?.access?.["app/example/table"]
  const formAccess = data?.access?.["app/example/form"]

  tableAccess && dynamicRoutes.push(registerRoutes.table)
  formAccess && dynamicRoutes.push(registerRoutes.form)

  return { dynamicRoutes, isLoading, isValidating, error }
}
