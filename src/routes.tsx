import { Link, RouteObject } from "react-router-dom"
import { buttonVariants } from "./components"
import { Home, WildCardPage } from "./pages"

export const routesMerge = (dynamicRoutes: RouteObject[]): RouteObject[] => [
  {
    path: "/",
    element: (
      <div>
        <h1>{"Home"}</h1>
        <Link to="/app" className={buttonVariants({})}>
          {"Go to App"}
        </Link>
      </div>
    ),
    errorElement: <div>{"Error /"}</div>,
    loader: (prop) => {
      console.log("loader: ", prop)
      return null
    },
  },
  {
    path: "/app",
    element: <Home />,
    children: dynamicRoutes,
  },
  {
    path: "*",
    element: <WildCardPage />,
  },
]
