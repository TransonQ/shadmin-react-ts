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
import { matchPath, useLocation, useNavigate } from "react-router-dom"

interface NavgationProps {
  footer?: React.ReactNode
  children?: React.ReactNode
}

export interface NavgationItemProps {
  url?: string
  icon?: LucideIcon
  label?: string
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
  const location = useLocation()
  console.log("location: ", location.pathname)
  const active = matchPath(location.pathname, "/app")
  console.log("active: ", active)
  const navigate = useNavigate()

  const NavMarkup = collapsed
    ? items.map((nav, i) => (
        <Tooltip key={i}>
          <TooltipTrigger
            onClick={() => nav.url && navigate(nav.url)}
            className={cn(
              "w-full px-1 py-2 rounded-sm",
              "hover:bg-primary/40 hover:cursor-default",
              "flex items-center justify-center",
              nav.url &&
                matchPath(location.pathname, nav.url) &&
                "bg-primary/20"
            )}
          >
            {nav.icon && <Icon source={nav.icon} />}
          </TooltipTrigger>
          <TooltipContent align="end" side="right" className="max-w-64">
            <span>{nav.label}</span>
          </TooltipContent>
        </Tooltip>
      ))
    : items.map((nav, i) => (
        <div
          key={i}
          onClick={() => nav.url && navigate(nav.url)}
          style={{ minWidth: frameVariants.navbarWidth - 20 }}
          className={cn(
            "w-full px-1 py-2 rounded-sm",
            "hover:bg-primary/40 hover:cursor-default",
            "flex items-center gap-2 flex-nowrap",
            nav.url && matchPath(location.pathname, nav.url) && "bg-primary/20"
          )}
        >
          <div className="min-w-4">
            {nav.icon && <Icon source={nav.icon} />}
          </div>
          <span className="line-clamp-2">{nav.label}</span>
        </div>
      ))

  return (
    <BlockStack className={cn(fill && "flex-1")}>
      <Text as="h2" variant="headingSm" tone="subdued">
        {title}
      </Text>
      <BlockStack className="w-full" gap="sm">
        {NavMarkup}
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
