import { cn } from "@/lib"
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
  return (
    <header
      className={cn("pr-2 border-b bg-card")}
      style={{
        height: headerHeight,
        width: "100%",
        zIndex,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      {children}
    </header>
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
  return (
    <nav
      className={cn(
        "border-r bg-card",
        "transition-all duration-150 ease-in-out"
      )}
      style={{
        position: "fixed",
        width: collapsed ? navbarCollapsedWidth : navbarWidth,
        height: `calc(100vh - ${headerHeight}px)`,
        top: headerHeight,
        left: 0,
        zIndex,
      }}
    >
      {children}
    </nav>
  )
}

const FrameMain = ({
  children,
  navbarCollapsed,
}: {
  children?: React.ReactNode
  navbarCollapsed?: boolean
}) => {
  return (
    <main
      className={cn("p-4 transition-all duration-150 ease-in-out")}
      style={{
        marginLeft: navbarCollapsed ? navbarCollapsedWidth : navbarWidth,
        marginTop: headerHeight,
      }}
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
