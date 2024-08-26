import { useAuth } from "@/hooks"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { shadmin } from "./shadmin"
import { SkeletonApp } from "./skeleton-app"

export const Auth = ({ children }: { children?: React.ReactNode }) => {
  const { isLoading, error, data } = useAuth()
  console.log("useAuth: ", data)
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      shadmin.toast.error("Unauthorized")
      navigate("/login") // 当 error 存在时，执行重定向
    }
  }, [error, navigate])

  if (isLoading) {
    return <SkeletonApp />
  }

  return <>{children}</>
}
