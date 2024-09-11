import { cn } from "@/lib"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"
import { useFrameConfig, useMediaQuery } from "."

import { buttonVariants } from "../../ui/button"
import { Show } from "../show"
import { Screens } from "./constants"

export const NavigationCollapsed = () => {
  const md = useMediaQuery(Screens.md)

  const { isNavbarCollapsed, onNavbarCollapsedChange } = useFrameConfig()

  const CollapsedButton = (
    <Show when={md}>
      <PanelLeftCloseIcon
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "p-2 w-8 h-8 text-gray-500",
          "shrink-0"
        )}
        onClick={() => onNavbarCollapsedChange?.(true)}
      />
    </Show>
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
    <Show when={isNavbarCollapsed && md} fallback={CollapsedButton}>
      {ExpandedButton}
    </Show>
  )
}
