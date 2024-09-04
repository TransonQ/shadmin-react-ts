import { cn } from "@/lib"
import { Loader2Icon } from "lucide-react"
import { DropdownMenuItem } from "../ui"
import { Show } from "./show"
import type {
  DestructableAction,
  DisableableAction,
  IconableAction,
  LoadableAction,
} from "./types"

interface MenuItemProps
  extends DestructableAction,
    LoadableAction,
    DisableableAction,
    IconableAction {
  className?: string
}
/**
 * @name MenuItem
 * @description 给予下拉菜单 destructive 属性的样式
 */
export function MenuItem({
  content,
  onAction,
  loading,
  disabled,
  destructive,
  className,
  icon,
}: MenuItemProps) {
  return (
    <DropdownMenuItem
      onClick={onAction}
      disabled={disabled || loading}
      className={cn(
        "truncate flex items-center gap-2",
        destructive &&
          "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className
      )}
    >
      <Show when={loading} fallback={icon}>
        <Loader2Icon className="w-4 h-4 animate-spin" />
      </Show>
      {content}
    </DropdownMenuItem>
  )
}
