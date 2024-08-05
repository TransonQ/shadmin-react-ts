import {
  BlockStack,
  frameVariants,
  Icon,
  ScrollArea,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components"
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
  icon?: LucideIcon
  collapsed?: boolean
}

function NavgationDefault({ children, footer }: NavgationProps) {
  return (
    <BlockStack x-chunk="NAVGATION" className="h-full">
      <ScrollArea
        style={{
          height: `calc(100vh - ${frameVariants.headerHeight * 2}px)`,
        }}
        className="w-full p-2 pt-2"
      >
        {children}
      </ScrollArea>
      <Footer>{footer}</Footer>
    </BlockStack>
  )
}

function Section({ title, fill, items, collapsed }: NavgationSectionProps) {
  const NavMarkup = collapsed
    ? items.map((nav, i) => (
        <Tooltip key={i}>
          <TooltipTrigger
            className={cn(
              "w-full px-1 py-2 rounded-sm",
              "hover:bg-primary/20 hover:cursor-default",
              "flex items-center justify-center"
            )}
          >
            {nav.icon && <Icon source={nav.icon} />}
          </TooltipTrigger>
          <TooltipContent
            align="end"
            side="right"
          >
            <p>{nav.label}</p>
          </TooltipContent>
        </Tooltip>
      ))
    : items.map((nav, i) => (
        <div
          className={cn(
            "w-full px-1 py-2 rounded-sm",
            "hover:bg-primary/20 hover:cursor-default",
            "flex items-center gap-2"
          )}
        >
          <div className="min-w-4">
            {nav.icon && <Icon source={nav.icon} />}
          </div>
          {nav.label}
        </div>
      ))

  return (
    <BlockStack className={cn(fill && "flex-1")}>
      <Text as="h2" variant="headingSm" tone="subdued">
        {title}
      </Text>
      <BlockStack className="w-full">{NavMarkup}</BlockStack>
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
