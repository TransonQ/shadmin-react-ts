import { redirect, RouteObject } from "react-router-dom"
import { NotFound404, SkeletonApp } from "./components"
import { AppShell } from "./layouts"
import { Bills, UpdateBill } from "./pages/example"
import { Login } from "./pages/login"
import { RootLoading } from "./pages/root"

export const routesMerge = (): RouteObject[] => [
  {
    path: "/",
    errorElement: <div>{"Error /"}</div>,
    element: <RootLoading />,
  },
  {
    path: "/app",
    element: <AppShell />,
    children: [
      /** add static routes */
      {
        index: true,
        loader: () => redirect("/app/dashboard"),
      },
      {
        path: "/app/dashboard",
        element: <Bills />,
      },
      {
        path: "bills/update/:id?",
        element: <UpdateBill />,
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <SkeletonApp />,
  },
]
