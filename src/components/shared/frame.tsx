import { cn } from "@/lib"
import { CSSProperties } from "react"
import { frameVariants } from "./config"

const { headerHeight, navbarWidth, navbarCollapsedWidth, zIndex } =
  frameVariants

const FrameShell = ({ children }: { children?: React.ReactNode }) => {
  return <div x-chunk="FRAME">{children}</div>
}

const FrameHeader = ({
  children,
  hidden,
}: {
  children?: React.ReactNode
  hidden?: boolean
}) => {
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
    !hidden && (
      <header style={styles} className={cn("pr-2 border-b bg-card")}>
        {children}
      </header>
    )
  )
}

const FrameNavbar = ({
  children,
  collapsed,
  hidden,
}: {
  children?: React.ReactNode
  collapsed?: boolean
  hidden?: boolean
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
    !hidden && (
      <nav
        style={styles}
        className={cn(
          "border-r bg-card",
          "transition-all duration-150 ease-in-out"
        )}
      >
        {children}
      </nav>
    )
  )
}

const FrameMain = ({
  children,
  navbarCollapsed,
  navbarHidden,
  headerHidden,
}: {
  children?: React.ReactNode
  navbarCollapsed?: boolean
  navbarHidden?: boolean
  headerHidden?: boolean
}) => {
  const left = navbarCollapsed ? navbarCollapsedWidth : navbarWidth
  const styles: CSSProperties = {
    marginLeft: navbarHidden ? 0 : left,
    marginTop: headerHidden ? 0 : headerHeight,
  }

  return (
    <main
      style={styles}
      className={cn("p-4 transition-all duration-150 ease-in-out")}
    >
      {children}
    </main>
  )
}

FrameHeader.displayName = "FrameHeader"
FrameNavbar.displayName = "FrameNavbar"
FrameMain.displayName = "FrameMain"

export const Frame = Object.assign(FrameShell, {
  Header: FrameHeader,
  Navbar: FrameNavbar,
  Main: FrameMain,
})
