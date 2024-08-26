import {
  IndexTable,
  LegendCard,
  LegendSelect,
  Page,
  tableConfig,
  TablePagination,
} from "@/components/shared"
import { Input } from "@/components/ui"
import type { Task } from "@/schemas/task.schema"
import type {
  ColumnDef,
  ColumnFiltersState,
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
import { genfakeTableData, priorities, statuses } from "../table/data"
import { columns } from "./columns"

/**
 * @link https://tanstack.com/table/latest/docs/api/core/table#meta
 * @link [demo](https://stackblitz.com/github/tanstack/table/tree/main/examples/react/editable-data?embed=1&theme=dark&preset=node&file=src/main.tsx)
 */

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Task>> = {
  cell: function TableCellRender({
    getValue,
    row: { index },
    column: { id },
    table,
  }) {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // 当输入失焦时，将调用表元的 updateData 函数
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    //如果 initialValue 被更改为 external，则将其与我们的 state 同步
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    switch (id) {
      case "priority":
        return (
          <LegendSelect
            value={value as string}
            onChange={(v) => {
              setValue(v)
            }}
            options={priorities}
            className="bg-transparent border-none -ml-4"
          />
        )
      case "status":
        return (
          <LegendSelect
            value={value as string}
            onChange={(v) => {
              setValue(v)
            }}
            options={statuses}
            className="bg-transparent border-none -ml-4"
          />
        )
      case "id":
      case "title":
      default:
        return (
          <Input
            className="p-0 bg-transparent border-none truncate"
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        )
    }
  },
}

export function EditableTaleExample() {
  const [data, setData] = useState(() => genfakeTableData(1000))
  const refreshData = () => setData(() => genfakeTableData(1000))
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    defaultColumn, // input cell
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
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // 跳过页面索引重置，直到下次重新呈现后,自动分页 autoResetPageIndex 默认为 true (手动分页时,不需要, 因为 autoResetPageIndex 手动分页时默认为 false)
        skipAutoResetPageIndex()
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
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
