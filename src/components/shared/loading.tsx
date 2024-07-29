import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

export const Loading = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 50) {
          return prev + 4
        } else if (prev < 80) {
          return prev + 2
        } else if (prev < 95) {
          return prev + 1
        } else {
          return prev
        }
      })
    }, 200)

    return () => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => setProgress(0), 500)
    }
  }, [])
  return ReactDOM.createPortal(
    <div className="z-50 fixed w-full h-[3px] top-0 left-0 bg-zinc-200">
      <div
        className="z-50 bg-zinc-950 w-1 h-[3px] transition-all ease-linear duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>,
    document.body
  )
}
