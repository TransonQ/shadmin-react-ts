import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"
import { cn } from "@/lib"
import type { RowSelectionState } from "@tanstack/react-table"
import {
  flexRender,
  type ColumnDef,
  type Table as ReactTable,
} from "@tanstack/react-table"
import { countBy } from "lodash-es"
import { Show } from "../show"
import type { BulkActionItem } from "./bulk-actions"
import { BulkActions } from "./bulk-actions"

export interface IndexTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  table: ReactTable<TData>
  className?: string
  rowSelection?: RowSelectionState
  /** Bulk actions */
  stickyBulkActions?: boolean
  bulkActions?: BulkActionItem[]
}

export function IndexTable<TData, TValue>({
  columns,
  table,
  className,
  rowSelection,
  ...rest
}: IndexTableProps<TData, TValue>) {
  const bulkActionsProps = rest
  const selectedCount = countBy(rowSelection).true || 0

  const HeadersMarkup = table.getHeaderGroups().map((headerGroup) => (
    <TableRow key={headerGroup.id} className="bg-muted/30">
      {headerGroup.headers.map((header) => {
        return (
          <TableHead key={header.id} colSpan={header.colSpan} className="h-10">
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        )
      })}
    </TableRow>
  ))

  return (
    <div className={cn("rounded-md border", className)}>
      <Show when={!!selectedCount} fallback={null}>
        <BulkActions
          table={table}
          selectedCount={selectedCount}
          {...bulkActionsProps}
        />
      </Show>
      <Table>
        <TableHeader className={cn("h-10")}>
          <Show when={!selectedCount} fallback={null}>
            {HeadersMarkup}
          </Show>
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
