import { cn } from "@/lib"

const headerHeight = 56
const navbarWidth = 240

const FrameShell = ({ children }: { children?: React.ReactNode }) => {
  return <div x-chunk="FRAME">{children}</div>
}

const FrameHeader = ({
  children,
  collapsed,
  hidden,
}: {
  children?: React.ReactNode
  collapsed?: boolean
  hidden?: boolean
}) => {
  return (
    <header
      style={{ height: headerHeight, position: "fixed", top: 0, width: "100%" }}
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
        width: navbarWidth,
        height: `calc(100vh - ${headerHeight}px)`,
        position: "fixed",
        top: headerHeight,
      }}
      className={cn("border-r bg-card")}
    >
      {children}
    </nav>
  )
}

const FrameMain = ({ children }: { children?: React.ReactNode }) => {
  return (
    <main style={{ marginLeft: navbarWidth, marginTop: headerHeight }}>
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
