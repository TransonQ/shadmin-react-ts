import type { AppliedFilters, TableTab } from "@/components/shared"
import { FilterCheckbox, TableFiltersBar } from "@/components/shared"
import { Button } from "@/components/ui"
import { generateArray } from "@/lib"
import type {
  ColumnFiltersState,
  ColumnOrderState,
  Table,
} from "@tanstack/react-table"
import { isEqual } from "lodash-es"
import { Columns3Icon } from "lucide-react"
import { useState } from "react"
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

  const [selected, setSelected] = useState(0)
  const [itemString, setItemString] = useState([
    "All",
    "Active",
    "Completed",
    ...generateArray(10, (i) => `Tab_${i + 3}`),
  ])
  const tabs: TableTab[] = itemString.map((item, idx) => ({
    content: item,
    id: `${item}-${idx}`,
    isLocked: idx === 0,
    actions: [
      {
        type: "rename",
        onAction: (value) => {
          console.log("rename action: ", value, idx)
        },
      },
      {
        type: "edit",
        onAction: () => {
          console.log("edit action", idx)
        },
      },
      {
        type: "duplicate",
        onAction: (value) => {
          console.log("duplicate action: ", value, idx)
        },
      },
      {
        type: "delete",
        onAction: () => {
          console.log("delete action", idx)
        },
      },
    ],
  }))

  const appliedfilters: AppliedFilters[] = []

  if (table.getColumn("status")) {
    appliedfilters.push({
      key: "status",
      filter: table.getColumn("status") && (
        <FilterCheckbox
          column={table.getColumn("status")}
          title="Status"
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
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
      queryValue={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
      onQueryChange={(value) => table.getColumn("id")?.setFilterValue(value)}
      onQueryClear={() => table.getColumn("id")?.setFilterValue(undefined)}
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
