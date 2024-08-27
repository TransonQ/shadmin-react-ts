import { FilterCheckbox } from "@/components/shared"
import { Button, Input } from "@/components/ui"
import type {
  ColumnFiltersState,
  ColumnOrderState,
  Table,
} from "@tanstack/react-table"
import { isEqual } from "lodash-es"
import { XIcon } from "lucide-react"
import { statuses } from "./data"

interface FiltersBarProps<TData> {
  table: Table<TData>
  columnOrders?: ColumnOrderState
  columnFilters?: ColumnFiltersState
}

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

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="搜索编号或摘要"
          value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("code")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

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
            className="h-8 px-2 lg:px-3"
          >
            {"Reset All"}
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
