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
}

export interface PresetSelectSingleProps extends SelectBaseProps {
  multiple?: false
  onChange: (value: string) => void
  value: string
}

export interface PresetSelectMultipleProps extends SelectBaseProps {
  multiple?: true
  onChange: (value: string[]) => void
  value: string[]
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
