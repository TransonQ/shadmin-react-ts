import type { RouteObject } from "react-router-dom"
import { redirect } from "react-router-dom"
import { NoAccess403, NotFound404, SeverError500 } from "./components"
import { AppShell } from "./layouts"
import { Home } from "./pages/example"
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
        loader: () => redirect("/app/home"),
      },
      {
        path: "/app/home",
        element: <Home />,
      },
      {
        path: "/app/noAccess",
        element: <NoAccess403 />,
      },
      {
        path: "/app/error",
        element: <SeverError500 />,
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
    element: <NotFound404 className="h-screen" />,
  },
]
