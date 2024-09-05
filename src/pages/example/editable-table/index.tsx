import {
  IndexTable,
  LegendCard,
  Page,
  tableConfig,
  TablePagination,
} from "@/components/shared"
import type { Task } from "@/schemas/task.schema"
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowData,
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
import { useCallback, useEffect, useRef, useState } from "react"
import { genfakeTableData } from "../table/data"
import { columns } from "./columns"
import { EditableCell } from "./editable-cell"

/**
 * @link https://tanstack.com/table/latest/docs/api/core/table#meta
 * @link [demo](https://stackblitz.com/github/tanstack/table/tree/main/examples/react/editable-data?embed=1&theme=dark&preset=node&file=src/main.tsx)
 */
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateDataByRowIndex: (
      rowIndex: number,
      columnId: string,
      value: unknown
    ) => void
    /**
     * @name updateDataByRowId
     * @description
     * 根据行 id 更新单元格,当 tableOptions 里面的 getRowId 自定义为当前行的 id 时可以使用.
     * 用于当更新了单元格的数据后,需要调用接口,通常是根据每一行的 id 进行接口的调用
     */
    updateDataByRowId?: (
      rowId: number | string,
      columnId: string,
      value: unknown
    ) => void
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Task>> = {
  cell: EditableCell,
}

export function EditableTaleExample() {
  const [data, setData] = useState(() => genfakeTableData(1000))
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const table = useReactTable({
    data,
    columns,
    defaultColumn, // input cell
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    getRowId: tableConfig.getRowId,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex,
    meta: {
      updateDataByRowIndex: (rowIndex, columnId, value) => {
        console.log("rowIndex: ", rowIndex)
        // 跳过页面索引重置，直到下次重新呈现后,自动分页 autoResetPageIndex 默认为 true (手动分页时,不需要, 因为 autoResetPageIndex 手动分页时默认为 false)
        skipAutoResetPageIndex()
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              console.log("columnId: ", columnId)
              console.log("value: ", value)
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
      updateDataByRowId: (rowId, columnId, value) => {
        skipAutoResetPageIndex()
        setData((old) =>
          old.map((row) => {
            if (row.id === rowId) {
              return {
                ...old.find((row) => row.id === rowId)!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
  })
  return (
    <Page title="EditableTaleExample">
      <LegendCard>
        <IndexTable
          table={table}
          columns={columns}
          rowSelection={rowSelection}
          hasSelectableColumn
          className="rounded-none border-x-0"
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

function useSkipper() {
  const shouldSkipRef = useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}
