import {
  IndexTable,
  LegendCard,
  Page,
  TablePagination,
  tableConfig,
} from "@/components/shared"
import { generateArray } from "@/lib"
import { faker } from "@faker-js/faker"
import type {
  ColumnFiltersState,
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
import { useState } from "react"
import { columns } from "./columns"
import { FiltersBar } from "./filters-bar"

const fakeData = generateArray(1000, (i) => ({
  id: `TASK_${i + 1}`,
  title: faker.lorem.words({ min: 2, max: 6 }),
  status: faker.helpers.arrayElement([
    "backlog",
    "todo",
    "in progress",
    "done",
    "canceled",
  ]),
  label: faker.helpers.arrayElement(["Bug", "Feature", "Documentation"]),
  priority: faker.helpers.arrayElement(["low", "medium", "high"]),
}))

export function TableExample() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: fakeData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    getRowId: tableConfig.getRowId,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <Page title="TableExample">
      <LegendCard>
        <FiltersBar />
        <IndexTable
          table={table}
          columns={columns}
          rowSelection={rowSelection}
          className="rounded-none border-x-0"
          bulkActions={[
            { content: "Veiew", pinned: true },
            { content: "Edit", pinned: true },
            { content: "Send", pinned: true, loading: true },
            { content: "Fork", pinned: true },
            {
              content: "Delete",
              destructive: true,
              pinned: true,
            },
          ]}
        />
        <TablePagination table={table} />
        <div className="h-[2000px] bg-cyan-100"></div>
      </LegendCard>
    </Page>
  )
}
