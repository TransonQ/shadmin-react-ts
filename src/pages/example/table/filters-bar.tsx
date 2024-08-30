import type { AppliedFilters, FilterMode, TableTab } from "@/components/shared"
import {
  FilterCheckbox,
  FilterDate,
  ModeEnum,
  TableFilters,
} from "@/components/shared"
import { Button } from "@/components/ui"
import { generateArray } from "@/lib"
import type {
  ColumnFiltersState,
  ColumnOrderState,
  Table,
} from "@tanstack/react-table"
import { has, isEqual } from "lodash-es"
import { Columns3Icon } from "lucide-react"
import { useEffect, useReducer, useState } from "react"
import { statuses } from "./data"

interface FiltersBarProps<TData> {
  table: Table<TData>
  columnOrders?: ColumnOrderState
  columnFilters?: ColumnFiltersState
}

type StoreFilters = { [key: string]: ColumnFiltersState }
const reducer = (
  data: StoreFilters,
  action: {
    type: "UPDATE" | "DELETE"
    payload: {
      key: string
      filterState: ColumnFiltersState
    }
  }
): StoreFilters => {
  switch (action.type) {
    case "UPDATE": {
      const { key, filterState } = action.payload
      return {
        ...data,
        [key]: filterState,
      }
    }
    case "DELETE": {
      const { key } = action.payload
      const newData = { ...data }
      delete newData[key]
      return newData
    }
    default:
      return data
  }
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

  // 模拟储存筛选

  const [filtersData, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    console.log("filtersData: ", filtersData)
  }, [filtersData])

  //~ onTabChange
  const handleTabChange = (tabName: string, tabIndex: number) => {
    setSelected(tabIndex)
    if (has(filtersData, tabName)) {
      setFilters(filtersData[tabName])
    }
  }

  //~ tabs
  const tabs: TableTab[] = itemString.map((item, idx) => ({
    content: item,
    id: `${item}-${idx}`,
    isLocked: ["All", "Active", "Completed"].includes(item),
    onAction: () => {
      handleTabChange(item, idx)
    },
    actions: [
      {
        type: "rename",
        onAction: (value) => {
          let oldValue = ""
          setItemString((itemString) => {
            const newItemsStrings = itemString.map((item, index) => {
              if (idx === index) {
                oldValue = item
                return value as string
              }
              return item
            })
            return newItemsStrings
          })
          if (oldValue) {
            dispatch({
              type: "DELETE",
              payload: {
                key: oldValue,
                filterState: filters,
              },
            })
          }
          dispatch({
            type: "UPDATE",
            payload: {
              key: value,
              filterState: filters,
            },
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
          dispatch({
            type: "UPDATE",
            payload: {
              key: value,
              filterState: filters,
            },
          })
        },
      },
      {
        type: "delete",
        onAction: () => {
          setItemString(itemString.filter((_, index) => index !== idx))
          setSelected(0)
          dispatch({
            type: "DELETE",
            payload: {
              key: itemString[idx],
              filterState: filters,
            },
          })
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
  if (table.getColumn("created_at")) {
    appliedfilters.push({
      key: "created_at",
      filter: table.getColumn("created_at") && (
        <FilterDate column={table.getColumn("created_at")} title="Created At" />
      ),
    })
  }

  //~ cancel
  const onCancel = () => {
    console.log("onCancel")
  }

  //~ save as
  const onCreateView = (tabName: string) => {
    setItemString([...itemString, tabName])
    setSelected(itemString.length)
    dispatch({
      type: "UPDATE",
      payload: {
        key: tabName,
        filterState: filters,
      },
    })
  }

  //~ save
  const onSaveView = () => {
    dispatch({
      type: "UPDATE",
      payload: {
        key: itemString[selected],
        filterState: filters,
      },
    })
  }

  return (
    <TableFilters
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
