import { Auth, Frame, InlineStack, Logo } from "@/components/shared"
import { TooltipProvider } from "@/components/ui"
import { useNavCollapse } from "@/hooks"
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { Navbar } from "./navbar"

/**
 * AppShell 的 collapsed=true 用于仅显示非权限相关的导航: 去掉除了 Main 相关的所有组件
 */
export const AppShell = ({ collapsed }: { collapsed?: boolean }) => {
  const [navCollapsed] = useNavCollapse()

  return (
    <Auth>
      <Frame>
        <TooltipProvider delayDuration={500}>
          <Frame.Header hidden={collapsed}>
            <InlineStack blockAlign="center" className="h-full">
              <Logo collapsed={navCollapsed} />
              <Header />
            </InlineStack>
          </Frame.Header>
          <Frame.Navbar hidden={collapsed} collapsed={navCollapsed}>
            <Navbar />
          </Frame.Navbar>
          <Frame.Main
            navbarCollapsed={navCollapsed}
            navbarHidden={collapsed}
            headerHidden={collapsed}
          >
            <Outlet />
          </Frame.Main>
        </TooltipProvider>
      </Frame>
    </Auth>
  )
}
