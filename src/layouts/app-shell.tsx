import { Auth, Frame, InlineStack } from "@/components/shared"
import { TooltipProvider } from "@/components/ui"
import { useNavCollapse } from "@/hooks"
import { cn } from "@/lib"
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { Navbar } from "./navbar"

/**
 * AppShell 的 collapsed=true 用于仅显示非权限相关的导航: 去掉除了 Main 相关的所有组件
 */
export const AppShell = () => {
  const [navCollapsed] = useNavCollapse()

  return (
    <Auth>
      <Frame>
        <TooltipProvider delayDuration={500}>
          <Frame.Header>
            <InlineStack blockAlign="center" className="h-full">
              <Frame.LogoBox collapsed={navCollapsed}>
                <div
                  className={cn(
                    "w-full h-full text-3xl font-bold p-3 text-nowrap",
                    "text-blue-700 flex items-center",
                    navCollapsed ? "justify-center" : "justify-start"
                  )}
                >
                  {navCollapsed ? "S" : "shadmin"}
                </div>
              </Frame.LogoBox>
              <Header />
            </InlineStack>
          </Frame.Header>
          <Frame.Navbar collapsed={navCollapsed}>
            <Navbar />
          </Frame.Navbar>
          <Frame.Main navbarCollapsed={navCollapsed}>
            <Outlet />
          </Frame.Main>
        </TooltipProvider>
      </Frame>
    </Auth>
  )
}
