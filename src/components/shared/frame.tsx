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
      className={cn("bg-slate-300 pr-2")}
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
      className={cn("bg-lime-300")}
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
