import { CommandGroup, CommandItem } from "@/components/ui"
import { cn } from "@/lib"
import { CheckIcon } from "lucide-react"
import { Show } from "../show"
import type { LegendSelectContentProps } from "./types"

export function LegendSelectContent({
  selectedValues,
  options,
  onChange,
  multiple,
}: LegendSelectContentProps) {
  return (
    <CommandGroup>
      {options.map((option) => {
        const isSelected = selectedValues.has(option.value)
        return (
          <CommandItem
            className="capitalize"
            disabled={false}
            key={option.value}
            onSelect={() => {
              if (!multiple) {
                // single select
                selectedValues.clear()
                if (!isSelected) {
                  selectedValues.add(option.value)
                }
                const value = Array.from(selectedValues)
                onChange?.(value.toString())
              } else {
                // multiple select
                if (isSelected) {
                  selectedValues.delete(option.value)
                } else {
                  selectedValues.add(option.value)
                }
                const values = Array.from(selectedValues)
                onChange?.(values)
              }
            }}
          >
            <Show when={!multiple} fallback={null}>
              <div
                className={cn(
                  "mr-2 flex h-4 w-4 items-center justify-center ",
                  isSelected
                    ? "opacity-100 [&_svg]:text-primary"
                    : "opacity-50 [&_svg]:invisible"
                )}
              >
                <CheckIcon className="h-4 w-4" />
              </div>
            </Show>

            <Show when={multiple} fallback={null}>
              <div
                className={cn(
                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "opacity-50 [&_svg]:invisible"
                )}
              >
                <CheckIcon className={cn("h-4 w-4")} />
              </div>
            </Show>

            {option.icon && (
              <option.icon
                className={cn(
                  "mr-2 h-4 w-4 text-muted-foreground",
                  isSelected && "text-primary"
                )}
              />
            )}
            <span className={cn(!multiple && isSelected && "text-primary")}>
              {option.label}
            </span>
          </CommandItem>
        )
      })}
    </CommandGroup>
  )
}
