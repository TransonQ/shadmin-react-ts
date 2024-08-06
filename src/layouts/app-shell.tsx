import {
  Frame,
  frameVariants,
  InlineStack,
  TooltipProvider,
} from "@/components"
import { useNavCollapse } from "@/hooks"
import { cn } from "@/lib"
import { CSSProperties } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { Navbar } from "./navbar"
const { headerHeight, navbarWidth } = frameVariants

/**
 * AppShell 的 collapsed=true 用于仅显示非权限相关的导航: 去掉除了 Main 相关的所有组件
 */
export const AppShell = ({ collapsed }: { collapsed?: boolean }) => {
  const styles: CSSProperties = {
    width: navbarWidth,
    lineHeight: `${headerHeight}px`,
  }

  const [navCollapsed] = useNavCollapse()

  return (
    <Frame>
      <TooltipProvider delayDuration={500}>
        <Frame.Header hidden={collapsed}>
          <InlineStack blockAlign="center" className="h-full">
            <div
              style={styles}
              className={cn(
                "shrink-0 h-full text-3xl font-bold text-center",
                "text-indigo-600"
              )}
            >
              {"Shadmin"}
            </div>
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
  )
}
