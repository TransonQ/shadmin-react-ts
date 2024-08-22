import { Badge, Button } from "@/components/ui"
import { cn } from "@/lib"
import { ChevronDownIcon } from "lucide-react"
import { Show } from "../show"
import type { PresetSelectTriggerProps } from "./types"

export function SelectTrigger({
  selectedValues,
  title,
  requiredIndicator,
  disabled,
  placeholder,
  options,
}: PresetSelectTriggerProps) {
  const fieldDisplay = (valuesSet: Set<string>) => {
    const firstSelectedLabel = options.find(
      (option) => option.value === Array.from(valuesSet)[0]
    )?.label

    if (valuesSet.size === 1) {
      return firstSelectedLabel
    } else {
      return (
        <div className="w-full flex justify-between items-center">
          {firstSelectedLabel}
          <Badge variant="secondary" className="ml-2 mr-4">
            {selectedValues.size - 1} selected
          </Badge>
        </div>
      )
    }
  }
  return (
    <div>
      <Show when={!!title} fallback={null}>
        <h5 className="mb-2">
          {title}
          {requiredIndicator && <span className="text-destructive"> *</span>}
        </h5>
      </Show>
      <Button
        disabled={disabled}
        variant={"outline"}
        className={cn(
          "w-full justify-start text-left font-normal disabled:opacity-100 disabled:bg-muted",
          !selectedValues.size && "text-muted-foreground"
        )}
      >
        {selectedValues.size ? (
          fieldDisplay(selectedValues)
        ) : (
          <span>{placeholder}</span>
        )}
        <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </div>
  )
}
