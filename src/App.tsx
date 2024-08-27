import { Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SWRConfig } from "swr"
import { Loading } from "./components/shared"
import { Toaster } from "./components/ui"
import { routesMerge } from "./routes"

const routes = routesMerge()

function App() {
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
        <Toaster position="bottom-center" toastOptions={{ unstyled: true }} />
        <RouterProvider router={router} />
      </SWRConfig>
    </Suspense>
  )
}

export default App
