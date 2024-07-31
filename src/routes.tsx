import { RouteObject } from "react-router-dom"
import { Home, loaderRoot, WildCardPage } from "./pages"

export const routesMerge = (dynamicRoutes?: RouteObject[]): RouteObject[] => [
  {
    path: "/",
    errorElement: <div>{"Error /"}</div>,
    loader: loaderRoot,
  },
  {
    path: "/app",
    element: <Home />,
    children: [
      ...(dynamicRoutes ?? []),
      /** add static routes */
    ],
  },
  {
    path: "*",
    element: <WildCardPage />,
  },
]
