import type {
  AppliedFilters
} from "@/components/shared";
import {
  FilterCheckbox,
  TableFiltersBar,
} from "@/components/shared";
import { Button } from "@/components/ui";
import type {
  ColumnFiltersState,
  ColumnOrderState,
  Table,
} from "@tanstack/react-table";
import { isEqual } from "lodash-es";
import { Columns3Icon } from "lucide-react";
import { statuses } from "./data";

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

  const appliedfilters: AppliedFilters[] = []

  if (table.getColumn("status")) {
    appliedfilters.push({
      key: "status",
      filter: table.getColumn("status") && (
        <FilterCheckbox
          column={table.getColumn("status")}
          title="我方开票主体"
          options={statuses}
        />
      ),
    })
  }
  /* {table.getColumn("start_date") && (
          <FilterDate column={table.getColumn("start_date")} title="开始日期" />
        )} */

  return (
    <TableFiltersBar
      queryValue={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
      onQueryChange={(value) => table.getColumn("id")?.setFilterValue(value)}
      onClearAllFilters={() => table.resetColumnFilters()}
      filters={appliedfilters}
      isFiltered={isFiltered}
      external={
        <Button variant={"outline"} size={"icon"} className="w-8 h-8">
          <Columns3Icon className="h-4 w-4" />
        </Button>
      }
    />
  )
}
