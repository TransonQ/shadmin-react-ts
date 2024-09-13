import {
  Frame,
  FrameHeader,
  FrameLogoBox,
  FrameMain,
  FrameNavbar,
  FrameProvider,
  InlineStack,
  Screens,
  useMediaQuery,
} from "@/components/shared"
import { TooltipProvider } from "@/components/ui"
import { cn } from "@/lib"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { Navbar } from "./navbar"

export const AppShell = () => {
  const [isCollapsed, setCollapsed] = useState(false)
  const md = useMediaQuery(Screens.md)

  return (
    <FrameProvider
      config={{
        logo: <Logo />,
        isNavbarCollapsed: isCollapsed || !md,
        onNavbarCollapsedChange: setCollapsed,
      }}
    >
      <Frame>
        <TooltipProvider delayDuration={500}>
          <FrameHeader>
            <InlineStack blockAlign="center" className="h-full">
              <Logo />
              <Header />
            </InlineStack>
          </FrameHeader>
          <FrameNavbar>
            <Navbar />
          </FrameNavbar>
          <FrameMain>
            <Outlet />
          </FrameMain>
        </TooltipProvider>
      </Frame>
    </FrameProvider>
  )

  function Logo() {
    const md = useMediaQuery(Screens.md)
    const isMini = isCollapsed || !md

    return (
      <FrameLogoBox>
        <div
          className={cn(
            "w-full h-full text-3xl font-bold p-3 text-nowrap",
            "text-blue-700 flex items-center",
            isMini ? "justify-center" : "justify-start"
          )}
        >
          {isMini ? "S" : "shadmin"}
        </div>
      </FrameLogoBox>
    )
  }
}
