import { Suspense, useCallback, useEffect, useState } from "react"
import {
  createBrowserRouter,
  Link,
  matchRoutes,
  Outlet,
  RouteObject,
  RouterProvider,
  useLocation,
  useParams,
} from "react-router-dom"
import { getAccess } from "./api"
import { buttonVariants, Loading } from "./components"

function useDynamicRoutes() {
  const [loading, setLoading] = useState(true)
  const [dynamicRoutes, setDynamicRoutes] = useState<RouteObject[]>([])

  const fetchDynamicRoutes = useCallback(async () => {
    const { name } = await getAccess()
    console.log("name: ", name)
    
    setDynamicRoutes([
      {
        path: "/app/a",
        element: <A />,
        errorElement: <div>{"Error /a"}</div>,
      },
      {
        path: "/app/b/:id?",
        element: <B />,
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

function WildCard() {
  const location = useLocation()
  const { dynamicRoutes, loading } = useDynamicRoutes()

  if (loading) {
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

function Root() {
  const { loading } = useDynamicRoutes()

  return (
    <div x-chunk="APP">
      {loading && <Loading />}
      <h1>{"App"}</h1>
      <div className="flex gap-4">
        <Link to="/" className={buttonVariants({})}>
          {"Home"}
        </Link>
        {!loading && (
          <Link to="/app/a" className={buttonVariants({})}>
            {"A"}
          </Link>
        )}
        {!loading && (
          <>
            <Link to="/app/b" className={buttonVariants({})}>
              {"B"}
            </Link>
            <Link to="/app/b/123" className={buttonVariants({})}>
              {"B id"}
            </Link>
          </>
        )}
      </div>
      <Outlet />
    </div>
  )
}

function A() {
  const location = useLocation()
  const { dynamicRoutes } = useDynamicRoutes()

  const matchA = matchRoutes(dynamicRoutes, location)
  console.log("matchA: ", matchA)

  return (
    <div>
      <h1>{"App A"}</h1>
    </div>
  )
}

function B() {
  const { id } = useParams()
  const { dynamicRoutes } = useDynamicRoutes()

  const matchB = matchRoutes(dynamicRoutes, location)
  console.log("matchB: ", matchB)

  return (
    <div>
      <h1>{"App B" + id}</h1>
    </div>
  )
}

function App() {
  const { dynamicRoutes, loading } = useDynamicRoutes()
  const routes = createBrowserRouter([
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
      element: <Root />,
      children: dynamicRoutes,
    },
    {
      path: "*",
      element: <WildCard />,
    },
  ])

  return (
    <Suspense fallback={<Loading />}>
      {loading && <Loading />}
      <RouterProvider router={routes} />
    </Suspense>
  )
}

export default App
