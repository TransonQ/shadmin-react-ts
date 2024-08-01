import { Frame, frameVariants, InlineStack } from "@/components"
import { useNavCollapse } from "@/hooks"
import { cn } from "@/lib"
import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"

/**
 * AppShell 的 collapsed=true 用于仅显示非权限相关的导航: 去掉除了 Main 相关的所有组件
 */
export const AppShell = ({ collapsed }: { collapsed?: boolean }) => {
  const [navCollapsed] = useNavCollapse()

  return (
    <Frame>
      <Frame.Header hidden={collapsed}>
        <InlineStack blockAlign="center" className="h-full">
          <div
            style={{ width: frameVariants.navbarWidth }}
            className={cn(
              "shrink-0 h-full text-3xl font-bold text-center leading-[56px]",
              "text-indigo-600"
            )}
          >
            {"Shadmin"}
          </div>
        </InlineStack>
      </Frame.Header>
      <Frame.Navbar hidden={collapsed} collapsed={navCollapsed}>
        <Navbar />
      </Frame.Navbar>
      <Frame.Main navbarCollapsed={navCollapsed}>
        <Outlet />
      </Frame.Main>
    </Frame>
  )
}
