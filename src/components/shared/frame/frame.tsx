import { cn } from "@/lib"

import type { CSSProperties } from "react"
import { useFrameConfig } from "./frame-provider"

export const Frame = ({ children }: { children?: React.ReactNode }) => {
  return <div x-chunk="FRAME">{children}</div>
}

export const FrameHeader = ({ children }: { children?: React.ReactNode }) => {
  const { headerHeight, zIndex } = useFrameConfig()

  const styles: CSSProperties = {
    height: headerHeight,
    width: "100%",
    zIndex,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  }

  return (
    <header
      x-chunk="FRAME_HEADER"
      style={styles}
      className={cn("bg-card", "border-b", "pr-2")}
    >
      {children}
    </header>
  )
}

export const FrameNavbar = ({ children }: { children?: React.ReactNode }) => {
  const {
    isNavbarCollapsed,
    zIndex,
    navbarWidth,
    navbarCollapsedWidth,
    headerHeight,
  } = useFrameConfig()

  const H =
    typeof headerHeight === "number" ? `${headerHeight}px` : headerHeight

  const styles: CSSProperties = {
    position: "fixed",
    width: isNavbarCollapsed ? navbarCollapsedWidth : navbarWidth,
    height: `calc(100vh - ${H})`,
    top: headerHeight,
    left: 0,
    zIndex,
  }

  return (
    <nav
      x-chunk="FRAME_NAVBAR"
      style={styles}
      className={cn(
        "bg-card",
        "border-r",
        "transition-all duration-100 ease-in-out"
      )}
    >
      {children}
    </nav>
  )
}

export const FrameMain = ({ children }: { children?: React.ReactNode }) => {
  const { isNavbarCollapsed, navbarWidth, navbarCollapsedWidth, headerHeight } =
    useFrameConfig()

  const H =
    typeof headerHeight === "number" ? `${headerHeight}px` : headerHeight
  const left = isNavbarCollapsed ? navbarCollapsedWidth : navbarWidth

  const styles: CSSProperties = {
    marginLeft: left,
    marginTop: H,
  }

  return (
    <main
      x-chunk="FRAME_MAIN"
      style={styles}
      className={cn("p-1 md:p-4", "transition-all duration-100 ease-in-out")}
    >
      {children}
    </main>
  )
}

export const FrameLogoBox = ({ children }: { children?: React.ReactNode }) => {
  const { isNavbarCollapsed, navbarWidth, navbarCollapsedWidth } =
    useFrameConfig()

  const styles: React.CSSProperties = {
    width: isNavbarCollapsed ? navbarCollapsedWidth : navbarWidth,
  }
  return (
    <div
      x-chunk="FRAME_LOGOBOX"
      style={styles}
      className={cn("flex-shrink-0 transition-all duration-100")}
    >
      {children}
    </div>
  )
}
