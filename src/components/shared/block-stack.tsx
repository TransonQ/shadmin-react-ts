import { cn } from "@/lib"
import type { ClassNameValue } from "tailwind-merge"
import type { Align, CrossAlign, Gap } from "../lib"
import { calcFlexItems, calcFlexJustify, calcGap } from "../lib"

type BlockStackProps = {
  children?: React.ReactNode
  align?: Align
  inlineAlign?: CrossAlign
  gap?: Gap
  className?: ClassNameValue
}

export const BlockStack = ({
  children,
  align,
  inlineAlign,
  gap,
  className,
}: BlockStackProps) => {
  return (
    <div
      className={cn(
        "flex flex-col",
        calcFlexJustify(align),
        calcFlexItems(inlineAlign),
        calcGap(gap),
        className
      )}
    >
      {children}
    </div>
  )
}
