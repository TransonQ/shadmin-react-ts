import { cn } from "@/lib"
import { ClassNameValue } from "tailwind-merge"
import {
  Align,
  calcFlexItems,
  calcFlexJustify,
  calcGap,
  CrossAlign,
  Gap,
} from "../calc"

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
        "flex flex-col items-start",
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
