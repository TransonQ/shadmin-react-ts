import { cn } from "@/lib"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"
import { buttonVariants } from "../ui/button"
import { useFrameConfig } from "./frame"

export const NavCollapsed = () => {
  const { isNavbarCollapsed, onNavbarCollapsedChange } = useFrameConfig()

  return !isNavbarCollapsed ? (
    <PanelLeftCloseIcon
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "p-2 w-8 h-8 text-gray-500",
        "shrink-0"
      )}
      onClick={() => onNavbarCollapsedChange?.(true)}
    />
  ) : (
    <PanelLeftOpenIcon
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "p-2 w-8 h-8 text-gray-500",
        "shrink-0"
      )}
      onClick={() => onNavbarCollapsedChange?.(false)}
    />
  )
}
