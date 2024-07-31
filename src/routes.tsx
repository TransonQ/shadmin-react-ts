import { RouteObject } from "react-router-dom"
import { AppShell } from "./layouts"
import { Bills, loaderRoot, UpdateBill } from "./pages"

export const routesMerge = (): RouteObject[] => [
  {
    path: "/",
    errorElement: <div>{"Error /"}</div>,
    loader: loaderRoot,
  },
  {
    path: "/app",
    element: <AppShell collapsed={false} />,
    children: [
      /** add static routes */
      {
        index: true,
        element: <Bills />,
      },
      {
        path: "bills",
        element: <Bills />,
      },
      {
        path: "bills/update/:id?",
        element: <UpdateBill />,
      },
    ],
  },
]
