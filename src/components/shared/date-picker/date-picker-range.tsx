import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui"
import { cn } from "@/lib"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DatePickerRangeProps } from "./types"

export function DatePickerRange({
  disabled,
  placeholder,
  className,
  value,
  onChange,
}: DatePickerRangeProps) {
  const fmtFrom = value?.from && format(value.from, "yyyy/MM/dd")
  const fmtTo = value?.to && format(value.to, "yyyy/MM/dd")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            disabled && "disabled:opacity-100 bg-muted",
            !value && "text-muted-foreground"
          )}
        >
          {value ? (
            fmtFrom + (fmtTo ? ` - ${fmtTo}` : "")
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)} align="start">
        <Calendar
          // locale={zhCN}
          mode="range"
          numberOfMonths={2}
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
