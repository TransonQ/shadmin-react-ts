import { BlockStack, NavCollapsed, Text } from "@/components"
import { LucideIcon } from "lucide-react"

interface NavgationProps {
  children?: React.ReactNode
}

interface NavgationItemProps {
  url?: string
  icon?: LucideIcon
  label?: string
  elected?: boolean
  /** TODO @todo The level of the item */
  level?: number
}

interface NavgationSectionProps {
  title?: string
  fill?: boolean
  items: NavgationItemProps[]
  /** TODO @todo The icon to display in the section */
  icon?: LucideIcon
}

function NavgationDefault({ children }: NavgationProps) {
  return (
    <BlockStack className="h-full p-3">
      {children}

      <div className="absolute bottom-2 right-1">
        <NavCollapsed />
      </div>
    </BlockStack>
  )
}

function Section({ title, fill }: NavgationSectionProps) {
  return (
    <BlockStack className={fill && "flex-1"} gap="md">
      <Text as="h2" variant="headingSm" tone="subdued">
        {title}
      </Text>
    </BlockStack>
  )
}

NavgationDefault.displayName = "Navgation"
Section.displayName = "NavgationSection"
export const Navgation = Object.assign(NavgationDefault, {
  Section,
})
