import { Suspense } from "react"
import { Loading } from "./components"

function App() {
  return (
    <Suspense fallback="Loading...">
      <Loading />
    </Suspense>
  )
}

export default App
