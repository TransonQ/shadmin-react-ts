import { IndexTableHeader } from "@/components/shared"
import { Checkbox } from "@/components/ui"
import type { Task } from "@/schemas/task.schema"
import type { ColumnDef } from "@tanstack/react-table"
import { Operation } from "../table/operation"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
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
    header: ({ column }) => <IndexTableHeader column={column} title="Task" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <IndexTableHeader column={column} title="Title" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <IndexTableHeader column={column} title="Status" />,

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <IndexTableHeader column={column} title="Priority" />
    ),

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Operation row={row} />,
  },
]
