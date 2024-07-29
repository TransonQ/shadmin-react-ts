import { Button, popper, Toaster } from "./components"

function App() {
  return (
    <>
      <Button
        onClick={() => {
          popper.success("Custom toast")
        }}
      >
        shadcn button
      </Button>

      <Toaster position="bottom-center" />
    </>
  )
}

export default App
