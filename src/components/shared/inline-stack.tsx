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
  wrap?: boolean
}

export const InlineStack = ({
  children,
  className,
  align,
  blockAlign,
  gap,
  wrap,
}: InlineStackProps) => {
  return (
    <div
      className={cn(
        "flex",
        calcFlexJustify(align),
        calcFlexItems(blockAlign),
        calcGap(gap),
        !wrap && "flex-nowrap",
        className
      )}
    >
      {children}
    </div>
  )
}
