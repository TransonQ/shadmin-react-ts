import { DatePickerRange } from "./date-picker-range"
import { DatePickerSingle } from "./date-picker-single"
import {
  isDatePickerRangeProps,
  type DatePickerRangeProps,
  type DatePickerSingleProps,
} from "./types"

export function DatePicker(props: DatePickerSingleProps): React.ReactNode
export function DatePicker(props: DatePickerRangeProps): React.ReactNode

export function DatePicker(
  props: DatePickerSingleProps | DatePickerRangeProps
): React.ReactNode {
  if (isDatePickerRangeProps(props)) {
    return <DatePickerRange {...props} />
  } else {
    return <DatePickerSingle {...props} />
  }
}
