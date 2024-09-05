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
  /** Sticky columns */
  hasSelectableColumn?: boolean
  stickyLastColumn?: boolean
}

export function IndexTable<TData, TValue>({
  columns,
  table,
  className,
  rowSelection,
  hasSelectableColumn,
  stickyLastColumn,
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
        <TableHeader className={cn("relative h-10")}>
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
                className="group box-content"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "py-1 relative box-border group-data-[state=selected]:border-y",
                      index === 0 &&
                        "sticky bg-card z-10 left-0 group-data-[state=selected]:bg-accent transition-colors group-hover:bg-muted/40",
                      hasSelectableColumn &&
                        index === 1 &&
                        "sticky bg-card z-10 left-8 group-data-[state=selected]:bg-accent transition-colors group-hover:bg-muted/40"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    <StickyLeftSeparator index={index} positionIndex={1} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {"No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function StickyLeftSeparator({
  index,
  positionIndex = 0,
  bordered,
}: {
  index: number
  positionIndex?: number
  bordered?: boolean
}) {
  return (
    <div
      className={cn(
        "absolute",
        index === positionIndex && "inset-[0_0_0_100%]",
        bordered && "border-l"
      )}
    />
  )
}
