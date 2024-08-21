import { cn } from "@/lib"
import type { ClassNameValue } from "tailwind-merge"
import type { Align, CrossAlign, Gap } from "../calc"
import { calcFlexItems, calcFlexJustify, calcGap } from "../calc"

type InlineStackProps = {
  children?: React.ReactNode
  className?: ClassNameValue
  align?: Align
  blockAlign?: CrossAlign
  gap?: Gap
  fullWidth?: boolean
  fill?: boolean
  wrap?: boolean
}

export const InlineStack = ({
  children,
  className,
  align,
  blockAlign,
  gap,
  fullWidth,
  fill,
  wrap,
}: InlineStackProps) => {
  return (
    <div
      className={cn(
        "flex",
        calcFlexJustify(align),
        calcFlexItems(blockAlign),
        calcGap(gap),
        fullWidth && "w-full",
        fill && "flex-1",
        wrap ? "flex-wrap" : "flex-nowrap",
        className
      )}
    >
      {children}
    </div>
  )
}
