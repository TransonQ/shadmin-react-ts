import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui"
import { cn } from "@/lib"
import { Show } from "../show"
import { SelectContent } from "./select-content"
import { SelectTrigger } from "./select-triger"
import type {
  PresetSelectContentProps,
  PresetSelectMultipleProps,
  PresetSelectSingleProps,
} from "./types"

function SelectBase(props: PresetSelectSingleProps): React.ReactNode
function SelectBase(props: PresetSelectMultipleProps): React.ReactNode

function SelectBase(
  props: PresetSelectSingleProps | PresetSelectMultipleProps
) {
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
    multiple,
  } = props

  const selectedValues = new Set(
    multiple && Array.isArray(value) ? value : [value]
  )

  const CmdMarkup = (
    <CommandList>
      <CommandEmpty>{"No results"}</CommandEmpty>
      <SelectContent
        multiple={multiple}
        options={options}
        selectedValues={selectedValues as Set<string>}
        onChange={onChange as PresetSelectContentProps["onChange"]}
      />
    </CommandList>
  )

  const ClickThenClosePopover = (
    <PopoverClose className="w-full h-full">{CmdMarkup}</PopoverClose>
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={className}>
          <SelectTrigger
            title={title}
            placeholder={placeholder}
            selectedValues={selectedValues as Set<string>}
            requiredIndicator={requiredIndicator}
            disabled={disabled}
            options={options}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0")} align="start">
        <Command>
          {showSearch && <CommandInput placeholder={title} />}
          <Show when={multiple || showSearch} fallback={ClickThenClosePopover}>
            {CmdMarkup}
          </Show>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

SelectBase.displayName = "PresetSelect"

export const PresetSelect = Object.assign(SelectBase, {})
