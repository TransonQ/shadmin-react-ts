import { cn } from "@/lib"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"
import { buttonVariants } from "../ui/button"
import { useFrameConfig } from "./frame"
import { Show } from "./show"

export const NavigationCollapsed = () => {
  const { isNavbarCollapsed, onNavbarCollapsedChange } = useFrameConfig()

  const CollapsedButton = (
    <PanelLeftCloseIcon
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "p-2 w-8 h-8 text-gray-500",
        "shrink-0"
      )}
      onClick={() => onNavbarCollapsedChange?.(true)}
    />
  )

  const ExpandedButton = (
    <PanelLeftOpenIcon
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "p-2 w-8 h-8 text-gray-500",
        "shrink-0"
      )}
      onClick={() => onNavbarCollapsedChange?.(false)}
    />
  )

  return (
    <Show when={isNavbarCollapsed} fallback={CollapsedButton}>
      {ExpandedButton}
    </Show>
  )
}
