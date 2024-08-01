import { cn } from "@/lib"
import { frameVariants } from "./config"
const { headerHeight, navbarWidth, navCollapsedWidth, zIndex } = frameVariants

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
      style={{
        height: headerHeight,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex,
      }}
      className={cn("pr-2 border-b bg-card")}
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
      style={{
        width: collapsed ? navCollapsedWidth : navbarWidth,
        height: `calc(100vh - ${headerHeight}px)`,
        position: "fixed",
        top: headerHeight,
        zIndex,
      }}
      className={cn(
        "border-r bg-card",
        "transition-all duration-150 ease-in-out"
      )}
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
      style={{
        marginLeft: navbarCollapsed ? navCollapsedWidth : navbarWidth,
        marginTop: headerHeight,
      }}
      className="p-4 transition-all duration-150 ease-in-out"
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
