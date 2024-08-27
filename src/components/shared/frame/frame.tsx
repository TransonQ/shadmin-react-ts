import { cn } from "@/lib"
import type { CSSProperties } from "react"
import { frameVariants } from "../config"

const { headerHeight, navbarWidth, navbarCollapsedWidth, zIndex } =
  frameVariants

const FrameShell = ({ children }: { children?: React.ReactNode }) => {
  return <div x-chunk="FRAME">{children}</div>
}

const FrameHeader = ({ children }: { children?: React.ReactNode }) => {
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

const FrameNavbar = ({
  children,
  collapsed,
}: {
  children?: React.ReactNode
  collapsed?: boolean
}) => {
  const styles: CSSProperties = {
    position: "fixed",
    width: collapsed ? navbarCollapsedWidth : navbarWidth,
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

const FrameMain = ({
  children,
  navbarCollapsed,
  navbarHidden,
}: {
  children?: React.ReactNode
  navbarCollapsed?: boolean
  navbarHidden?: boolean
}) => {
  const left = navbarCollapsed ? navbarCollapsedWidth : navbarWidth
  const styles: CSSProperties = {
    marginLeft: navbarHidden ? 0 : left,
    marginTop: headerHeight,
  }

  return (
    <main
      x-chunk="FRAME_MAIN"
      style={styles}
      className={cn("p-4", "transition-all duration-100 ease-in-out")}
    >
      {children}
    </main>
  )
}

const FrameLogoBox = ({
  collapsed,
  children,
}: {
  collapsed?: boolean
  children?: React.ReactNode
}) => {
  const styles: React.CSSProperties = {
    width: collapsed ? navbarCollapsedWidth : navbarWidth,
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

FrameHeader.displayName = "FrameHeader"
FrameNavbar.displayName = "FrameNavbar"
FrameMain.displayName = "FrameMain"
FrameLogoBox.displayName = "FrameLogoBox"

export const Frame = Object.assign(FrameShell, {
  Header: FrameHeader,
  Navbar: FrameNavbar,
  Main: FrameMain,
  LogoBox: FrameLogoBox,
})
