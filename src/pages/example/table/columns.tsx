import { TableColumnHeader } from "@/components/shared"
import { Badge, Checkbox } from "@/components/ui"
import type { Task } from "@/schemas/task.schema"
import type { ColumnDef } from "@tanstack/react-table"
import { format, isSameDay, isWithinInterval } from "date-fns"
import { labels, priorities, statuses } from "./data"
import { Operation } from "./operation"

export const getColumnTitle = (columnId: keyof Task) => {
  switch (columnId) {
    case "id":
      return "ID"
    case "title":
      return "Title"
    case "label":
      return "Label"
    case "priority":
      return "Priority"
    case "status":
      return "Status"
    case "created_at":
      return "Created At"
    default:
      return columnId
  }
}

/**
 * @description 约定
 * 1. 约定 accessorKey 都是需要展示在 table 上的字段.
 * 2. 约定 id 都是不需要展示在 table 上的字段,仅仅作为语义化筛选字段储存值使用.
 */
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
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
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={getColumnTitle("id")} />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={getColumnTitle("title")} />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={getColumnTitle("status")} />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={getColumnTitle("priority")} />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <TableColumnHeader column={column} title={getColumnTitle("created_at")} />
    ),
    cell: ({ row }) => {
      return (
        <div className="min-w-[160px]">
          {format(row.getValue("created_at"), "yyyy-MM-dd")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const date = row.getValue(id)

      if (value[0].to) {
        return isWithinInterval(date, {
          start: value[0].from,
          end: value[0].to || value[0].from,
        })
      }
      return isSameDay(date, value[0].from)
    },
  },
  {
    accessorKey: "actions",
    header: () => null,
    cell: ({ row }) => <Operation row={row} />,
  },
]
