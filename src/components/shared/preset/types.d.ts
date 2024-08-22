type OnSingleChange = (value: string) => void
type OnMultipleChange = (value: string[]) => void

export interface SelectBaseProps {
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
  multiple?: boolean
  onChange: OnSingleChange | OnMultipleChange
  value: string | string[]
}

export interface PresetSelectTriggerProps
  extends Omit<SelectBaseProps, "value" | "onChange"> {
  selectedValues: Set<string>
}

export interface PresetSelectContentProps
  extends Pick<SelectBaseProps, "options"> {
  selectedValues: Set<string>
  multiple?: boolean
  onChange: (value: string | string[]) => void
}
