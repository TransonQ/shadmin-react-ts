import { popper, SkeletonApp } from "@/components/shared"
import { useAuth } from "@/hooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const RootLoading = () => {
  const navigate = useNavigate()
  const { error, isLoading, data } = useAuth()

  if (error) {
    popper.error("Unauthorized")
    navigate("/login")
  }

  useEffect(() => {
    if (data) {
      navigate("/app")
    }
  }, [data, navigate])

  if (isLoading) {
    return <SkeletonApp />
  }

  return <SkeletonApp />
}
