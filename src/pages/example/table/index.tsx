import {
  IndexTable,
  LegendCard,
  Page,
  TablePagination,
  tableConfig,
} from "@/components/shared"
import type {
  ColumnFiltersState,
  ColumnOrderState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useAtom } from "jotai/react"
import { atomWithStorage } from "jotai/utils"
import { useEffect, useState } from "react"
import { columns } from "./columns"
import { genfakeTableData } from "./data"
import { FiltersBar } from "./filters-bar"

const data = genfakeTableData(1000)

const columnOrderAtom = atomWithStorage<ColumnOrderState>("columnOrder", [])

export function TableExample() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  // const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [columnOrder, setColumnOrder] = useAtom(columnOrderAtom)

  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnOrder,
      pagination,
    },
    enableRowSelection: true,
    getRowId: tableConfig.getRowId,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    console.log("columnFilters", JSON.stringify(columnFilters, null, 2))
  }, [columnFilters])

  return (
    <Page title="TableExample">
      <LegendCard>
        <FiltersBar table={table} />
        <IndexTable
          table={table}
          columns={columns}
          rowSelection={rowSelection}
          className="rounded-none border-x-0"
          hasSelectableColumn
          stickyLastColumn
          bulkActions={[
            { content: "Veiew", pinned: true },
            { content: "Edit", pinned: true },
            { content: "Send", loading: true },
            { content: "Fork" },
            {
              content: "Delete",
              destructive: true,
            },
          ]}
        />
        <TablePagination table={table} />
      </LegendCard>
    </Page>
  )
}
