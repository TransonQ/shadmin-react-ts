import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./global.css"

//#region mock service worker
async function enableMocking() {
  // return // If you need to mock data, comment out this line

  if (process.env.NODE_ENV !== "development") {
    return
  }
  const { worker } = await import("./mocks/browser")
  return worker.start()
}
//#endregion

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />)
})
