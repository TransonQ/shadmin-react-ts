import { cn } from "@/lib"
import type { CSSProperties } from "react"
import { frameVariants } from "../config"
import { useFrameConfig } from "./frame-provider"

const { headerHeight, navbarWidth, navbarCollapsedWidth, zIndex } =
  frameVariants

export const Frame = ({ children }: { children?: React.ReactNode }) => {
  return <div x-chunk="FRAME">{children}</div>
}

export const FrameHeader = ({ children }: { children?: React.ReactNode }) => {
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
  const { isNavbarCollapsed } = useFrameConfig()

  const styles: CSSProperties = {
    position: "fixed",
    width: isNavbarCollapsed ? navbarCollapsedWidth : navbarWidth,
    height: `calc(100vh - ${headerHeight}px)`,
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
  const { isNavbarCollapsed } = useFrameConfig()
  const left = isNavbarCollapsed ? navbarCollapsedWidth : navbarWidth

  const styles: CSSProperties = {
    marginLeft: left,
    marginTop: headerHeight,
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
  const { isNavbarCollapsed } = useFrameConfig()

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
