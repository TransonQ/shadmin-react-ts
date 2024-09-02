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
import type { DatePickerSingleProps } from "./types"

export function DatePickerSingle({
  disabled,
  placeholder,
  className,
  value,
  onChange,
}: DatePickerSingleProps) {
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
          {value ? format(value, "yyyy/MM/dd") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", className)} align="start">
        <Calendar
          // locale={zhCN}
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
