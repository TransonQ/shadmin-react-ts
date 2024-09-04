import type { AppliedFilters, FilterMode } from "@/components/shared"
import {
  FilterCheckbox,
  FilterDate,
  ModeEnum,
  TableColumnOptions,
  TableFilters,
  useFilterStore,
  useTableTabs,
} from "@/components/shared"
import { useAuth, useLocalStorageState } from "@/hooks"
import type { ColumnFiltersState, Table } from "@tanstack/react-table"
import { has, isEqual } from "lodash-es"
import { useState } from "react"
import { getColumnTitle } from "./columns"
import { statuses } from "./data"

interface FiltersBarProps<TData> {
  table: Table<TData>
  columnFilters?: ColumnFiltersState
}

export function FiltersBar<TData>({
  table,
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

  const { data: auth } = useAuth()

  const lockedTabStrings = ["All"]
  const [itemString, setItemString] = useLocalStorageState<string[]>(
    "table_tabs",
    lockedTabStrings,
    { keyPrefix: auth?.id }
  )

  //~ useFilterStore
  const store = useFilterStore("table", { keyPrefix: auth?.id })
  const {
    filterStore,
    updateFilters,
    deleteUpdateFilters,
    renameUpdateFilters,
  } = store

  //~ onTabChange
  const handleTabChange = (tabName: string, tabIndex: number) => {
    setSelected(tabIndex)
    if (has(filterStore, tabName)) {
      setFilters(filterStore[tabName])
    } else {
      if (lockedTabStrings.includes(tabName)) {
        /** 固定 tab 对应的初始化操作 */
        setFilters([])
      } else {
        /** 自定义的 tab 对应的初始化操作 */
        setFilters([])
      }
    }
  }

  //~ tabs
  const { tabs } = useTableTabs({
    itemString,
    setItemString,
    lockedTabs: lockedTabStrings,
    onTabChange: handleTabChange,
    onRenameTab: (prevTabLabel, tabLabel) => {
      renameUpdateFilters({
        key: tabLabel,
        prevKey: prevTabLabel,
        filterState: filters,
      })
    },
    onEditTab: () => {
      setMode(ModeEnum.filtering)
    },
    onDuplicateTab: (tabLabel) => {
      setSelected(itemString.length)
      updateFilters({
        key: tabLabel,
        filterState: filters,
      })
    },
    onDeleteTab: (idx) => {
      setSelected(0)
      deleteUpdateFilters({ key: itemString[idx], filterState: filters })
    },
  })

  //~ filters
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
    const tabIndex = selected
    const tabName = itemString[tabIndex]
    handleTabChange(tabName, tabIndex)
  }

  //~ save as
  const onCreateView = (tabName: string) => {
    setItemString([...itemString, tabName])
    setSelected(itemString.length)
    updateFilters({ key: tabName, filterState: filters })
  }

  //~ save
  const onSaveView = () => {
    updateFilters({ key: itemString[selected], filterState: filters })
  }

  return (
    <TableFilters
      tabs={tabs}
      selected={selected}
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
        <TableColumnOptions
          table={table}
          config={{ getColumnTitle, excludeColumnIds: ["select", "actions"] }}
        />
      }
    />
  )
}
