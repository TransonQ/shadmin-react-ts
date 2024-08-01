import { BlockStack, frameVariants, ScrollArea, Text } from "@/components"
import { cn } from "@/lib"
import { LucideIcon } from "lucide-react"

interface NavgationProps {
  footer?: React.ReactNode
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

function NavgationDefault({ children, footer }: NavgationProps) {
  return (
    <BlockStack className="h-full pl-3">
      <ScrollArea
        style={{ height: `calc(100vh - ${frameVariants.headerHeight * 2}px)` }}
        className="w-full pr-3 pt-3"
      >
        {children}
      </ScrollArea>
      <Footer>{footer}</Footer>
    </BlockStack>
  )
}

function Section({ title, fill, items }: NavgationSectionProps) {
  return (
    <BlockStack className={cn(fill && "flex-1")}>
      <Text as="h2" variant="headingSm" tone="subdued">
        {title}
      </Text>
      <BlockStack className="w-full">
        {items.map((nav, i) => (
          <div
            key={i}
            className={cn(
              "w-full p-1 rounded-sm",
              "hover:bg-primary/20 hover:cursor-default"
            )}
          >
            {nav.label}
          </div>
        ))}
      </BlockStack>
    </BlockStack>
  )
}

function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ height: frameVariants.headerHeight }} className="w-full">
      {children}
    </div>
  )
}

NavgationDefault.displayName = "Navgation"
Section.displayName = "NavgationSection"
export const Navgation = Object.assign(NavgationDefault, {
  Section,
})
