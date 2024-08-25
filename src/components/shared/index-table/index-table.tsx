import {
  Button,
  Checkbox,
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
import { InlineStack } from "../inline-stack"
import { Show } from "../show"
import { Text } from "../text"

interface IndexTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  table: ReactTable<TData>
  className?: string
  rowSelection?: RowSelectionState
}

export function IndexTable<TData, TValue>({
  columns,
  table,
  className,
  rowSelection,
}: IndexTableProps<TData, TValue>) {
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

  const BulkActionsMarkup = (
    <div
      className={cn(
        "sticky h-10 px-4 border-b shadow",
        "flex gap-2 items-center justify-between"
      )}
    >
      <InlineStack blockAlign="baseline" gap="md">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            if (!value) {
              table.toggleAllRowsSelected(value)
            }
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
        <Text variant="bodySm" tone="subdued">
          {selectedCount} {"selected"}
        </Text>
      </InlineStack>
      <InlineStack gap="md">
        <Button variant={"outline"} size={"sm"} className="px-5 shadow">
          delete
        </Button>
        <Button variant={"destructive"} size={"sm"} className="px-5 ">
          delete
        </Button>
      </InlineStack>
    </div>
  )

  return (
    <div className={cn("rounded-md border", className)}>
      <Show when={!!selectedCount} fallback={null}>
        {BulkActionsMarkup}
      </Show>
      <Table>
        <TableHeader className={cn("min-h-8", selectedCount && "bg-card")}>
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
