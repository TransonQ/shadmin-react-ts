import { InlineStack, NavCollapsed, Navgation } from "@/components"
import { useNavCollapse } from "@/hooks"
import { generateArray } from "@/lib"

const navs = generateArray(100, (i) => ({ label: `Section ${i + 1}` }))

export const Navbar = () => {
  return (
    <Navgation footer={<NavFooter />}>
      <Navgation.Section items={navs} />
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
    <InlineStack
      align="space-between"
      blockAlign="center"
      className="w-full h-full pr-1"
    >
      <div className="flex-1">{!navCollapsed && NavFooterContent}</div>
      <NavCollapsed />
    </InlineStack>
  )
}
