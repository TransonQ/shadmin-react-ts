import { InlineStack, NavCollapsed, Navgation } from "@/components"
import { useNavCollapse } from "@/hooks"
import { generateArray } from "@/lib"
import { UserIcon } from "lucide-react"

const navs = generateArray(10, (i) => ({
  label: `Section ${i + 1}`,
  icon: UserIcon,
}))

export const Navbar = () => {
  const [navCollapsed] = useNavCollapse()

  return (
    <Navgation footer={<NavFooter />}>
      <Navgation.Section items={navs} collapsed={navCollapsed} />
    </Navgation>
  )
}

function NavFooter() {
  const [navCollapsed] = useNavCollapse()

  const NavFooterContent = (
    <InlineStack align="center" blockAlign="center" gap="md" className="flex-1">
      <div className="text-lg font-semibold text-gray-400">{"navbar"}</div>
    </InlineStack>
  )

  return (
    <div
      x-chunk="NAVGATION.FOOTER"
      className="w-full h-full pr-1 flex justify-between items-center"
    >
      <div className="flex-1">{!navCollapsed && NavFooterContent}</div>
      <NavCollapsed />
    </div>
  )
}
