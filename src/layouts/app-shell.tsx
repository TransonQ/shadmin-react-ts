import { Auth, Frame, FrameProvider, InlineStack } from "@/components/shared"
import { TooltipProvider } from "@/components/ui"
import { cn } from "@/lib"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { Navbar } from "./navbar"

export const AppShell = () => {
  const [isCollapsed, setCollapsed] = useState(false)

  return (
    <Auth>
      <FrameProvider
        config={{
          logo: <Logo />,
          isNavbarCollapsed: isCollapsed,
          onNavbarCollapsedChange: setCollapsed,
        }}
      >
        <Frame>
          <TooltipProvider delayDuration={500}>
            <Frame.Header>
              <InlineStack blockAlign="center" className="h-full">
                <Frame.LogoBox>
                  <Logo />
                </Frame.LogoBox>
                <Header />
              </InlineStack>
            </Frame.Header>
            <Frame.Navbar>
              <Navbar />
            </Frame.Navbar>
            <Frame.Main>
              <Outlet />
            </Frame.Main>
          </TooltipProvider>
        </Frame>
      </FrameProvider>
    </Auth>
  )

  function Logo() {
    return (
      <div
        className={cn(
          "w-full h-full text-3xl font-bold p-3 text-nowrap",
          "text-blue-700 flex items-center",
          isCollapsed ? "justify-center" : "justify-start"
        )}
      >
        {isCollapsed ? "S" : "shadmin"}
      </div>
    )
  }
}
