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
  className?: string
}

function LayoutDefault({ children, sectioned }: LayoutProps) {
  const content = sectioned ? <Section>{children}</Section> : children
  return <div className="flex flex-wrap gap-4 justify-between">{content}</div>
}

function Section({ children, variant,className }: SectionProps) {
  const clacVariant = (v: SectionProps["variant"]) => {
    switch (v) {
      case "quarter":
        return "w-[calc(25%-0.25rem)] max-w-[340px]"
      case "oneHalf":
        return "w-[calc(50%-0.5rem)]"
      case "fullWidth":
      default:
        return "w-full flex-1"
    }
  }
  return <div className={cn("min-w-fit", clacVariant(variant))}>{children}</div>
}

export const Layout = Object.assign(LayoutDefault, {
  Section: Section,
})
