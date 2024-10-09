import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui"
import { cn } from "@/lib"
import type { Column } from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowDownUpIcon,
  ArrowUpIcon,
  EyeOffIcon,
} from "lucide-react"
import { Show } from "../show"

interface IndexTableHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title?: string
  className?: string
  required?: boolean
}

export function TableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  required,
}: IndexTableHeaderProps<TData, TValue>) {
  const requiredMarkup = (
    <Show when={required}>
      <span className="text-destructive"> *</span>
    </Show>
  )

  if (!column.getCanSort()) {
    return (
      <div className={cn("text-nowrap", className)}>
        {title}
        {requiredMarkup}
      </div>
    )
  }
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 text-nowrap data-[state=open]:bg-accent"
          >
            <span>
              {title}
              {requiredMarkup}
            </span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownUpIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {"Asc"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {"Desc"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {"Hide"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
