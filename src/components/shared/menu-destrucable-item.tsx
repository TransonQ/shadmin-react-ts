import { cn } from "@/lib"
import { Loader2Icon } from "lucide-react"
import { DropdownMenuItem } from "../ui"
import type {
  DestructableAction,
  DisableableAction,
  LoadableAction,
} from "./types"

interface MenuDestructableItemProps
  extends DestructableAction,
    LoadableAction,
    DisableableAction {
  className?: string
}
/**
 * @name DestructableItem
 * @description 给予下拉菜单 destructive 属性的样式
 */
export function MenuDestructableItem({
  content,
  onAction,
  loading,
  disabled,
  destructive,
  className,
}: MenuDestructableItemProps) {
  return (
    <DropdownMenuItem
      onClick={onAction}
      disabled={disabled}
      className={cn(
        "truncate flex items-center gap-2",
        destructive &&
          "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className
      )}
    >
      {loading && <Loader2Icon className="w-4 h-4 animate-spin" />}
      {content}
    </DropdownMenuItem>
  )
}
