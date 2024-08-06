import { InlineStack, NavCollapsed, Navgation } from "@/components"
import { navs } from "@/configs"
import { useNavCollapse } from "@/hooks"
import { cn } from "@/lib"

export const Navbar = () => {
  const [navCollapsed] = useNavCollapse()

  return (
    <Navgation footer={<NavFooter collapsed={navCollapsed} />}>
      <Navgation.Section items={navs} collapsed={navCollapsed} />
    </Navgation>
  )
}

function NavFooter({ collapsed }: { collapsed?: boolean }) {
  const NavFooterContent = (
    <InlineStack align="center" blockAlign="center" gap="md" className="flex-1">
      <div className={cn("text-lg font-semibold text-gray-400", "sr-only")}>
        {"Navbar content"}
      </div>
    </InlineStack>
  )

  return (
    <div
      x-chunk="NAVGATION.FOOTER"
      className={cn(
        "w-full h-full flex justify-between items-center",
        collapsed && "justify-center"
      )}
    >
      {!collapsed && <div className="flex-1">{NavFooterContent}</div>}
      <div x-chunk="COLLAPSER" className={cn(!collapsed && "pr-1")}>
        <NavCollapsed />
      </div>
    </div>
  )
}
