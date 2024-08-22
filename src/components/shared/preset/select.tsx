import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui"
import { cn } from "@/lib"
import { SelectContent } from "./select-content"
import { SelectTrigger } from "./select-triger"
import type {
  PresetSelectContentProps,
  PresetSelectMultipleProps,
  PresetSelectSingleProps,
} from "./types"

const SelectBase = (props: PresetSelectSingleProps) => {
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={className}>
          <SelectTrigger
            title={title}
            placeholder={placeholder}
            selectedValues={selectedValues}
            requiredIndicator={requiredIndicator}
            disabled={disabled}
            options={options}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0")} align="start">
        <Command>
          {showSearch && <CommandInput placeholder={title} />}
          <CommandList>
            <CommandEmpty>{"No results"}</CommandEmpty>
            <SelectContent
              multiple={false}
              options={options}
              selectedValues={selectedValues}
              onChange={onChange as PresetSelectContentProps["onChange"]}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const SelectMultiple = (props: PresetSelectMultipleProps) => {
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

  const selectedValues = new Set(value)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={className}>
          <SelectTrigger
            title={title}
            placeholder={placeholder}
            selectedValues={selectedValues}
            requiredIndicator={requiredIndicator}
            disabled={disabled}
            options={options}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0")} align="start">
        <Command>
          {showSearch && <CommandInput placeholder={title} />}
          <CommandList>
            <CommandEmpty>{"No results"}</CommandEmpty>
            <SelectContent
              multiple={true}
              options={options}
              selectedValues={selectedValues}
              onChange={onChange as PresetSelectContentProps["onChange"]}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

SelectBase.displayName = "SelectSingle"
SelectMultiple.displayName = "SelectMultiple"

export const PresetSelect = Object.assign(SelectBase, {
  Multiple: SelectMultiple,
})
