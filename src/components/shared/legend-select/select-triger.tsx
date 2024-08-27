import { Badge, Button } from "@/components/ui"
import { cn } from "@/lib"
import { ChevronDownIcon } from "lucide-react"
import { Icon } from "../icon"
import { Show } from "../show"
import type { LegendSelectTriggerProps } from "./types"

export function SelectTrigger({
  selectedValues,
  title,
  requiredIndicator,
  disabled,
  placeholder,
  options,
  className,
}: LegendSelectTriggerProps) {
  const fieldDisplay = (valuesSet: Set<string>) => {
    const firstSelected = options.find(
      (option) => option.value === Array.from(valuesSet)[0]
    )

    if (valuesSet.size === 1) {
      return (
        <span className="truncate flex items-center gap-2">
          {firstSelected?.icon && <Icon source={firstSelected?.icon} />}
          {firstSelected?.label}
        </span>
      )
    } else {
      return (
        <div className="w-full flex justify-between items-center line-clamp-1">
          <span className="truncate">
            {options
              .filter((option) => valuesSet.has(option.value))
              .map((option) => option.label)
              .join(", ")}
          </span>
          <Badge variant="secondary" className="ml-2 mr-4 flex-shrink-1">
            {selectedValues.size} selected
          </Badge>
        </div>
      )
    }
  }
  return (
    <>
      <Show when={!!title} fallback={null}>
        <h5 className="mb-2">
          <span className="text-sm font-medium">{title}</span>
          {requiredIndicator && <span className="text-destructive"> *</span>}
        </h5>
      </Show>
      <Button
        disabled={disabled}
        variant={"outline"}
        className={cn(
          'group-data-[state="open"]:bg-muted',
          "w-full justify-start text-left font-normal disabled:opacity-100 disabled:bg-muted",
          !selectedValues.size && "text-muted-foreground",
          className
        )}
      >
        {selectedValues.size ? (
          fieldDisplay(selectedValues)
        ) : (
          <span>{placeholder}</span>
        )}
        <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </>
  )
}
