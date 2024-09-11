import {
  InlineStack,
  Navigation,
  NavigationCollapsed,
  NavigationSection,
  useFrameConfig,
} from "@/components/shared"
import { navs } from "@/configs"
import { cn } from "@/lib"

export const Navbar = () => {
  const { isNavbarCollapsed } = useFrameConfig()

  return (
    <Navigation footer={<NavFooter collapsed={isNavbarCollapsed} />}>
      <NavigationSection
        title="Navigation"
        items={navs}
        collapsed={isNavbarCollapsed}
      />
    </Navigation>
  )
}

function NavFooter({ collapsed }: { collapsed?: boolean }) {
  const NavFooterContent = (
    <InlineStack align="center" blockAlign="center" gap="md" fill>
      <div className={cn("text-lg font-semibold text-gray-400", "sr-only")}>
        {"Navbar content"}
      </div>
    </InlineStack>
  )

  return (
    <div
      x-chunk="NAVGATION_FOOTER"
      className={cn(
        "w-full h-full flex justify-between items-center",
        collapsed && "justify-center"
      )}
    >
      {!collapsed && <div className="flex-1">{NavFooterContent}</div>}
      <div x-chunk="COLLAPSER" className={cn(!collapsed && "pr-1")}>
        <NavigationCollapsed />
      </div>
    </div>
  )
}
