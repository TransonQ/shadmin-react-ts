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
import type { LucideIcon } from "lucide-react"
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
  items?: Omit<NavgationItemProps, "items">[]
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

const SectionItem = ({
  children,
  className,
  selected,
  ...restProps
}: React.HTMLProps<HTMLDivElement> & {
  children?: React.ReactNode
  className?: string
  selected?: boolean
}) => {
  return (
    <div
      className={cn(
        "w-full pl-2 py-2 rounded-md text-sm",
        "hover:bg-primary/20 hover:cursor-default",
        selected && "bg-primary/25",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  )
}

function Section({ title, fill, items, collapsed }: NavgationSectionProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const NavMarkup = collapsed
    ? items.map((nav, i) => (
        <Tooltip key={i}>
          <TooltipTrigger
            className="w-full h-full"
            onClick={() => nav.url && navigate(nav.url)}
          >
            <SectionItem
              selected={!!matchPath(location.pathname, nav?.url ?? "")}
              className={cn("flex items-center justify-center")}
            >
              {nav.icon && <Icon source={nav.icon} />}
            </SectionItem>
          </TooltipTrigger>
          <TooltipContent align="end" side="right" className="max-w-64">
            <span>{nav.label}</span>
          </TooltipContent>
        </Tooltip>
      ))
    : items.map((nav, i) => (
        <SectionItem
          key={i}
          onClick={() => nav.url && navigate(nav.url)}
          selected={!!matchPath(location.pathname, nav?.url ?? "")}
          style={{ minWidth: frameVariants.navbarWidth - 20 }}
          className={cn("flex items-center gap-2 flex-nowrap")}
        >
          <div className="min-w-4">
            {nav.icon && <Icon source={nav.icon} />}
          </div>
          <span className="line-clamp-2">{nav.label}</span>
        </SectionItem>
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
