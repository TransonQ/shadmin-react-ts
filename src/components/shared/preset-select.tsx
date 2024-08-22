import { cn } from "@/lib"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui"
import { Show } from "./show"

interface SelectBaseProps {
  title?: string
  placeholder?: string
  requiredIndicator?: boolean
  disabled?: boolean
  showSearch?: boolean
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  className?: string
}

interface SelectSingleProps extends SelectBaseProps {
  value?: string
  onChange?: (value: string) => void
}

interface SelectMultipleProps extends SelectBaseProps {
  value?: string[]
  onChange?: (value: string[]) => void
}

const SelectBase = (props: SelectSingleProps) => {
  const {
    title,
    placeholder,
    requiredIndicator,
    disabled,
    showSearch,
    options,
    value,
    onChange,
    className,
  } = props

  const selectedValues = new Set(value ? [value] : [])

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
          <Badge variant="secondary" className="ml-2">
            + {selectedValues.size - 1}
          </Badge>
        </div>
      )
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={className}>
          <Show when={!!title} fallback={null}>
            <h5 className="mb-2">
              {title}
              {requiredIndicator && (
                <span className="text-destructive"> *</span>
              )}
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
      </PopoverTrigger>
      <PopoverContent className={cn("p-0")} align="start">
        <Command>
          {showSearch && <CommandInput placeholder={title} />}
          <CommandList>
            <CommandEmpty>{"No results"}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    className="capitalize"
                    disabled={false}
                    key={option.value}
                    onSelect={() => {
                      selectedValues.clear()
                      if (!isSelected) {
                        selectedValues.add(option.value)
                      }
                      const value = Array.from(selectedValues)
                      // else if (mode === "multiple") {
                      //   if (isSelected) {
                      //     selectedValues.delete(option.value)
                      //   } else {
                      //     selectedValues.add(option.value)
                      //   }
                      // }
                      onChange?.(value.toString())
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center ",
                        isSelected
                          ? "opacity-100"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    {/* {mode === "multiple" && (
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
                    )} */}
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const SelectMultiple = (props: SelectMultipleProps) => {
  return <></>
}

SelectBase.displayName = "SelectSingle"
SelectMultiple.displayName = "SelectMultiple"

export const PresetSelect = Object.assign(SelectBase, {
  Multiple: SelectMultiple,
})
