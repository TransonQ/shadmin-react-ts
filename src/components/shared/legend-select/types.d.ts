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

export interface LegendSelectSingleProps extends SelectBaseProps {
  multiple?: false
  onChange: (value: string) => void
  value: string
}

export interface LegendSelectMultipleProps extends SelectBaseProps {
  multiple?: true
  onChange: (value: string[]) => void
  value: string[]
}

export interface LegendSelectTriggerProps
  extends Omit<SelectBaseProps, "value" | "onChange"> {
  selectedValues: Set<string>
}

export interface LegendSelectContentProps
  extends Pick<SelectBaseProps, "options"> {
  selectedValues: Set<string>
  multiple?: boolean
  onChange: (value: string | string[]) => void
}
