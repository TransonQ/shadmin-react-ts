import type {
  AppliedFilters,
  FilterAction,
  FilterMode,
  TableTab,
} from "@/components/shared"
import { FilterCheckbox, ModeEnum, TableFiltersBar } from "@/components/shared"
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

  const queryValue = (table.getColumn("id")?.getFilterValue() as string) ?? ""
  const setQueryValue = (value: string | undefined) =>
    table.getColumn("id")?.setFilterValue(value)

  const [mode, setMode] = useState<FilterMode>(ModeEnum.default)
  const [selected, setSelected] = useState(0)
  const [itemString, setItemString] = useState([
    "All",
    "Active",
    "Completed",
    ...generateArray(5, (i) => `Tab ${i + 3}`),
  ])
  const tabs: TableTab[] = itemString.map((item, idx) => ({
    content: item,
    id: `${item}-${idx}`,
    isLocked: ["All", "Active", "Completed"].includes(item),
    onAction: () => {
      console.log("点击 tab 触发onAction: ", item, idx)
    },
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
          setMode(ModeEnum.filtering)
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

  const cancelViewActtion: FilterAction = {
    onAction: (tabName) => {
      console.log("cancel action: ", tabName)
    },
  }
  const createViewActtion: FilterAction = {
    onAction: (tabName) => {
      setItemString((prev) => {
        return [...prev, tabName]
      })
    },
  }

  const updateViewActtion: FilterAction = {
    onAction: (tabName) => {
      console.log("update action: ", tabName)
    },
  }

  return (
    <TableFiltersBar
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
      queryValue={queryValue}
      onQueryChange={setQueryValue}
      onQueryClear={() => setQueryValue(undefined)}
      onClearAllFilters={() => table.resetColumnFilters()}
      filters={appliedfilters}
      isFiltered={isFiltered}
      mode={mode}
      setMode={setMode}
      createAction={createViewActtion}
      updateAction={updateViewActtion}
      cancelAction={cancelViewActtion}
      external={
        <Button variant={"outline"} size={"icon"} className="w-8 h-8">
          <Columns3Icon className="h-4 w-4" />
        </Button>
      }
    />
  )
}
