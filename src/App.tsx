import { Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SWRConfig } from "swr"
import { Loading } from "./components"
import { useDynamicRoutes } from "./hooks"
import { routesMerge } from "./routes"

function App() {
  const { dynamicRoutes, isLoading } = useDynamicRoutes()
  const routes = routesMerge(dynamicRoutes)
  const router = createBrowserRouter(routes)

  return (
    <Suspense fallback={<Loading />}>
      <SWRConfig
        value={{
          focusThrottleInterval: 10 * 60 * 1000, // 失焦重新验证间隔
          revalidateOnFocus: false,
          revalidateOnMount: true,
        }}
      >
        {isLoading && <Loading />}
        <RouterProvider router={router} />
      </SWRConfig>
    </Suspense>
  )
}

export default App
