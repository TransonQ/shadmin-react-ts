import { Frame, InlineStack } from "@/components"
import { Outlet } from "react-router-dom"

/**
 * AppShell 的 collapsed=true 用于仅显示非权限相关的导航: 去掉除了 Main 相关的所有组件
 */
export const AppShell = ({ collapsed }: { collapsed?: boolean }) => {
  return (
    <Frame>
      <Frame.Header hidden={collapsed}>
        <InlineStack blockAlign="center" className="h-full">
          Header
        </InlineStack>
      </Frame.Header>
      <Frame.Navbar hidden={collapsed}>Navbar</Frame.Navbar>
      <Frame.Main>
        <Outlet />
      </Frame.Main>
    </Frame>
  )
}
