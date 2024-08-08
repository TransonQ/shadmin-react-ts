import { useAuth } from "@/hooks"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { popper } from "./popper"
import { SkeletonApp } from "./skeleton-app"

export const Auth = ({ children }: { children?: React.ReactNode }) => {
  const { isLoading, error } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      popper.error("Unauthorized")
      navigate("/login") // 当 error 存在时，执行重定向
    }
  }, [error, navigate])

  if (isLoading) {
    return <SkeletonApp />
  }

  return <>{children}</>
}
