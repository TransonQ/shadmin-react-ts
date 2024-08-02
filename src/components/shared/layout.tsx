import { cn } from "@/lib"

interface LayoutProps {
  /** Automatically adds sections to layout. */
  sectioned?: boolean
  /** The content to display inside the layout. */
  children?: React.ReactNode
}

interface SectionProps {
  children?: React.ReactNode
  variant?: "oneHalf" | "quarter" | "fullWidth"
  /**
   * @description Custom classname
   * EN: The layout is responsive, so please add the prefix 'md:' when customizing class names.
   * CN: Layout 是响应式的, 所以自定义 classname 的时候请加上前缀 'md:'
   */
  className?: string
}

function LayoutDefault({ children, sectioned }: LayoutProps) {
  const content = sectioned ? <Section>{children}</Section> : children
  return (
    <div
      className={cn(
        "flex flex-col gap-4 flex-wrap",
        "md:flex-row md:flex-wrap md:justify-between",
        "lg:flex-nowrap"
      )}
    >
      {content}
    </div>
  )
}

function Section({ children, variant = "fullWidth", className }: SectionProps) {
  const clacVariant = (v: SectionProps["variant"]) => {
    switch (v) {
      case "quarter":
        return cn("lg:w-[calc(25%-0.25rem)] lg:max-w-[340px]")
      case "oneHalf":
        return cn("md:w-[calc(50%-0.5rem)]")
      case "fullWidth":
      default:
        return cn("md:min-w-[540px]")
    }
  }
  return (
    <div className={cn("w-full flex-1", clacVariant(variant), className)}>
      {children}
    </div>
  )
}

LayoutDefault.displayName = "Layout"
Section.displayName = "LayoutSection"
export const Layout = Object.assign(LayoutDefault, {
  Section: Section,
})
