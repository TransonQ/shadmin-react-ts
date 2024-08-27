import { FilterCheckbox } from "@/components/shared"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  Button,
  Input,
  ScrollArea,
  ScrollBar,
} from "@/components/ui"
import { cn, generateArray } from "@/lib"
import type {
  ColumnFiltersState,
  ColumnOrderState,
  Table,
} from "@tanstack/react-table"
import { isEqual } from "lodash-es"
import {
  Columns3Icon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { statuses } from "./data"

interface FiltersBarProps<TData> {
  table: Table<TData>
  columnOrders?: ColumnOrderState
  columnFilters?: ColumnFiltersState
}

type FilterMode = "DEFAULT" | "FILTERING"

export function FiltersBar<TData>({
  table,
  columnOrders,
  columnFilters = [],
}: FiltersBarProps<TData>) {
  const filters = table.getState().columnFilters
  let isFiltered = filters.length > 0
  if (columnFilters?.length > 0) {
    isFiltered = !isEqual(filters, columnFilters)
  }

  const [mode, setMode] = useState<FilterMode>("DEFAULT")
  const isDefaultMode = mode === "DEFAULT"
  const isFilteringMode = mode === "FILTERING"
  const onModeChange = (v: FilterMode) => setMode(v)
  const toggleFiltering = () => setMode(isDefaultMode ? "FILTERING" : "DEFAULT")

  const InputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isFilteringMode && InputRef.current) {
      InputRef.current.focus()
    }
  }, [isFilteringMode])

  return (
    <Accordion
      type="single"
      x-chunk="Accordion"
      className="flex"
      collapsible
      value={mode}
      onValueChange={onModeChange}
    >
      <AccordionItem
        value="FILTERING"
        x-chunk="AccordionItem"
        className="border-none p-2 flex-1 overflow-hidden"
      >
        <div
          x-chunk="FILTER_DEFAULT"
          className={cn("flex gap-2", isFilteringMode && "hidden")}
        >
          <ScrollArea className="w-full pb-2">
            <div x-chunk="TABS_INDEX" className="w-full flex gap-1">
              {generateArray(14, (i) => (
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className={cn(i === 1 && "bg-muted")}
                >
                  {`tab-index-${i}`}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div x-chunk="TABS_ACTION" className="">
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex-shrink-0 px-2"
              onClick={toggleFiltering}
            >
              <SearchIcon className="h-4 w-4" />
              <SlidersHorizontalIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          x-chunk="FILTER_FILTERING"
          className={cn("flex items-center gap-2", isDefaultMode && "hidden")}
        >
          <Input
            ref={InputRef}
            placeholder="搜索编号或摘要"
            autoFocus={true}
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full flex-1"
          />
          <Button
            variant={"outline"}
            size={"sm"}
            className="flex-shrink-0 px-2"
            onClick={() => {
              toggleFiltering()
            }}
          >
            {"Cancel"}
          </Button>
          <Button
            variant={'default'}
            size={"sm"}
            className="flex-shrink-0 px-2"
            onClick={() => {
              toggleFiltering()
            }}
          >
            {"Sava as"}
          </Button>
        </div>

        <AccordionContent className="pb-0 pt-2 flex flex-wrap gap-2 items-center">
          {/* {table.getColumn("start_date") && (
          <FilterDate column={table.getColumn("start_date")} title="开始日期" />
        )} */}
          {table.getColumn("status") && (
            <FilterCheckbox
              column={table.getColumn("status")}
              title="我方开票主体"
              options={statuses}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-7 px-2 text-sm rounded-full "
            >
              {"Reset All"}
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
      <div x-chunk="FILTER_EXTERNAL" className="py-2 pr-2">
        <Button variant={"outline"} size={"icon"} className="w-8 h-8" >
          <Columns3Icon className="h-4 w-4" />
        </Button>
      </div>
    </Accordion>
  )
}
