import {
  Badge,
  Button,
  Calendar,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/components/ui"
import { cn } from "@/lib"
import type { Column } from "@tanstack/react-table"
import { format, sub } from "date-fns"
import { isEmpty } from "lodash-es"
import { PlusCircleIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Show } from "../show"

type DateRangeState = DateRange | undefined
type DateRangeValues = DateRangeState[] | undefined

interface FilterDateProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
}

export function FilterDate<TData, TValue>({
  column,
  title,
}: FilterDateProps<TData, TValue>) {
  const selectDate = column?.getFilterValue() as DateRangeValues
  const setSelectDate = (value: DateRangeValues) =>
    column?.setFilterValue(value)

  const fmtFrom =
    selectDate?.[0]?.from && format(selectDate[0].from, "yyyy/MM/dd")
  const fmtTo = selectDate?.[0]?.to && format(selectDate[0].to, "yyyy/MM/dd")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-7 rounded-full border-dashed text-xs",
            selectDate && "border-solid"
          )}
        >
          <Show when={isEmpty(selectDate)} fallback={null}>
            <PlusCircleIcon className="mr-2 h-4 w-4" />
          </Show>
          {title}
          {fmtFrom && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal "
              >
                {fmtFrom + (fmtTo ? ` - ${fmtTo}` : "")}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          numberOfMonths={2}
          selected={selectDate?.[0]}
          onSelect={(range) => {
            if (range) {
              column?.setFilterValue([range])
            } else {
              column?.setFilterValue(undefined)
            }
          }}
        />
        <Separator />
        <div className="p-2 flex justify-between gap-2">
          <div>
            <Button
              variant="ghost"
              size={"sm"}
              className={cn("h-8 px-4")}
              onClick={() =>
                setSelectDate([
                  {
                    from: sub(new Date(), { days: 7 }),
                    to: new Date(),
                  },
                ])
              }
            >
              {"Last 7 days"}
            </Button>
            <Button
              variant="ghost"
              size={"sm"}
              className={cn("h-8 px-4")}
              onClick={() =>
                setSelectDate([
                  { from: sub(new Date(), { days: 30 }), to: new Date() },
                ])
              }
            >
              {"Last 30 days"}
            </Button>
          </div>

          <PopoverClose asChild>
            <Button
              variant="outline"
              size={"sm"}
              className={cn("h-8 px-4")}
              disabled={!selectDate}
              onClick={() => {
                setSelectDate(undefined)
              }}
            >
              {"Clear"}
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
