import type { RouteObject } from "react-router-dom"
import { redirect } from "react-router-dom"
import {
  NoAccess403,
  NotFound404,
  RouteError,
  SeverError500,
} from "./components/errors"
import { AppShell } from "./layouts"
import {
  DashboardExmaple,
  EditableTaleExample,
  FormExample,
  Home,
  TableExample,
} from "./pages/example"
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
        errorElement: <RouteError />,
      },
      {
        path: "/app/dashboard",
        element: <DashboardExmaple />,
        errorElement: <RouteError />,
      },
      {
        path: "/app/table",
        element: <TableExample />,
        errorElement: <RouteError />,
      },
      {
        path: "/app/editable",
        element: <EditableTaleExample />,
        errorElement: <RouteError />,
      },
      {
        path: "/app/form",
        element: <FormExample />,
        errorElement: <RouteError />,
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
        errorElement: <div>{"Error /app/*"}</div>,
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
