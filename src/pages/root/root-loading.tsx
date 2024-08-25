import { popper, SkeletonApp } from "@/components/shared"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const RootLoading = () => {
  const navigate = useNavigate()
  // mock checking login
  const onRootLoading = useCallback(async () => {
      try {
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // throw new Error("error")
      popper.success("Login successfully, welcome!")
      navigate("/app")
    } catch (error) {
      navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    onRootLoading()
  }, [onRootLoading])

  return <SkeletonApp />
}
