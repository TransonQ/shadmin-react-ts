import type { AppliedFilters, FilterMode, TableTab } from "@/components/shared"
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
  const setFilters = (filters: ColumnFiltersState) =>
    table.setColumnFilters(filters)
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
          setItemString((itemString) => {
            const newItemsStrings = itemString.map((item, index) => {
              if (idx === index) {
                return value as string
              }
              return item
            })
            return newItemsStrings
          })
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
          setItemString([...itemString, value as string])
          setSelected(itemString.length)
        },
      },
      {
        type: "delete",
        onAction: () => {
          setItemString(itemString.filter((_, index) => index !== idx))
          setSelected(0)
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

  //~ cancel
  const onCancel = () => {
    console.log("onCancel")
  }

  //~ save as
  const onCreateView = (tabName: string) => {
    setItemString([...itemString, tabName])
    setSelected(itemString.length)
  }

  //~ save
  const onSaveView = () => {
    // 测试切换 tab 的时候设置本都存储的 filters
    setFilters([
      {
        id: "id",
        value: "12",
      },
      {
        id: "status",
        value: ["backlog", "todo"],
      },
    ])
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
      onCreateView={onCreateView}
      onSaveView={onSaveView}
      onCancel={onCancel}
      external={
        <Button variant={"outline"} size={"icon"} className="w-8 h-8">
          <Columns3Icon className="h-4 w-4" />
        </Button>
      }
    />
  )
}
