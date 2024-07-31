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

type InlineStackProps = {
  children?: React.ReactNode
  className?: ClassNameValue
  align?: Align
  blockAlign?: CrossAlign
  gap?: Gap
}

export const InlineStack = ({
  children,
  className,
  align,
  blockAlign,
  gap,
}: InlineStackProps) => {
  return (
    <div
      className={cn(
        "flex",
        calcFlexJustify(align),
        calcFlexItems(blockAlign),
        calcGap(gap),
        className
      )}
    >
      {children}
    </div>
  )
}
