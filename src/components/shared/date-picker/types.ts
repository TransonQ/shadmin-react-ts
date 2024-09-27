import type {
  DateRange,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from "react-day-picker"

interface DatePickerBase {
  disabled?: boolean
  placeholder?: string
  className?: string
  onBlur?: () => void
}

export interface DatePickerSingleProps extends DatePickerBase {
  isRangeMode?: false
  value: Date | undefined
  onChange: SelectSingleEventHandler
}

export interface DatePickerRangeProps extends DatePickerBase {
  isRangeMode?: true
  value: DateRange | undefined
  onChange: SelectRangeEventHandler
}

export function isDatePickerRangeProps(
  props: DatePickerSingleProps | DatePickerRangeProps
): props is DatePickerRangeProps {
  return props.isRangeMode === true
}
