import React from "react"

interface ShowProps {
  when?: boolean
  fallback?: React.ReactNode
  children?: React.ReactNode
  forceRender?: boolean
}

export const Show = ({ when, fallback, children, forceRender }: ShowProps) => {
  if (forceRender) {
    return (
      <ShowForceRender when={when} fallback={fallback}>
        {children}
      </ShowForceRender>
    )
  }

  return when ? <>{children}</> : <>{fallback}</>
}

function ShowForceRender({
  when,
  children,
  fallback,
}: Omit<ShowProps, "forceRender">) {
  return (
    <>
      <div style={when ? undefined : { display: "none" }}>{children}</div>
      {!when && fallback}
    </>
  )
}
