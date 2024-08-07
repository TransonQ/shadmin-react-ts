import { cn } from "@/lib"
import type { Gap } from "../calc";
import { calcGap } from "../calc"

interface ButtonGroupProps {
  gap?: Gap
  noWarp?: boolean
  children?: React.ReactNode
}
export const ButtonGroup = ({ gap, noWarp, children }: ButtonGroupProps) => {
  return (
    <div className={cn("flex", calcGap(gap), noWarp && "flex-nowrap")}>
      {children}
    </div>
  )
}
