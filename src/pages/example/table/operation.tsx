import { RowAction } from "@/components/shared"
import type { Row } from "@tanstack/react-table"

interface OperationProps<TData> {
  row: Row<TData>
}
export function Operation<TData>({ row }: OperationProps<TData>) {
  return <RowAction actions={[{ content: "Edit" }, { content: "Delete" }]} />
}
