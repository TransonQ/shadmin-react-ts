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
      {headerGroup.headers.map((header, index) => {
        return (
          <TableHead
            key={header.id}
            colSpan={header.colSpan}
            className={cn(
              "h-10",
              index === 0 &&
                "sticky bg-[#f9f9fa] z-10 left-0 group-data-[state=selected]:bg-accent",
              hasSelectableColumn &&
                index === 1 &&
                "sticky bg-[#f9f9fa] z-10 left-8 group-data-[state=selected]:bg-accent",
              stickyLastColumn &&
                index === headerGroup.headers.length - 1 &&
                "sticky bg-[#f9f9fa] z-10 right-0 group-data-[state=selected]:bg-accent"
            )}
          >
            <StickySeparator
              index={index}
              positionIndex={1}
              position="left"
            />
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
            <Show when={stickyLastColumn}>
              <StickySeparator
                index={index}
                positionIndex={headerGroup.headers.length - 1}
                position="right"
              />
            </Show>
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
                        "sticky bg-card z-10 left-0 transition-colors group-hover:bg-[#f9f9fa] group-data-[state=selected]:bg-accent",
                      hasSelectableColumn &&
                        index === 1 &&
                        "sticky bg-card z-10 left-8 transition-colors group-hover:bg-[#f9f9fa] group-data-[state=selected]:bg-accent",
                      stickyLastColumn &&
                        index === row.getVisibleCells().length - 1 &&
                        "sticky bg-card z-10 right-0 transition-colors group-hover:bg-[#f9f9fa] group-data-[state=selected]:bg-accent"
                    )}
                  >
                    <StickySeparator
                      index={index}
                      positionIndex={1}
                      position="left"
                    />
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    <Show when={stickyLastColumn}>
                      <StickySeparator
                        index={index}
                        positionIndex={row.getVisibleCells().length - 1}
                        position="right"
                      />
                    </Show>
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

function StickySeparator({
  index,
  positionIndex = 0,
  bordered,
  position = "left",
}: {
  index: number
  positionIndex?: number
  bordered?: boolean
  position?: "left" | "right"
}) {
  return (
    <div
      className={cn(
        "absolute box-border",
        index === positionIndex && position === "left" && "inset-[0_0_0_100%]",
        bordered && position === "left" && "border-r",
        index === positionIndex && position === "right" && "inset-[0_100%_0_0]",
        bordered && position === "right" && "border-l"
      )}
    />
  )
}
