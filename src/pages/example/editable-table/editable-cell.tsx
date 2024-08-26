import { LegendSelect } from "@/components/shared"
import { Input } from "@/components/ui"
import type { Cell, Column, Row, Table } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { priorities, statuses } from "../table/data"

interface EditableCellProps<TData, TValue> {
  table: Table<TData>
  row: Row<TData>
  column: Column<TData>
  cell: Cell<TData, TValue>
  getValue: () => any
  renderValue: () => any
}

export function EditableCell<TData, TValue>({
  getValue,
  row,
  column,
  table,
}: EditableCellProps<TData, TValue>) {
  const initialValue = getValue()
  const rowIndex = row.index
  const rowId = row.id
  const columnId = column.id
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  // 当输入失焦时，将调用表元的 updateData 函数
  const onBlur = () => {
    console.log({ rowIndex, rowId, columnId, value })
    table.options.meta?.updateDataByRowIndex(rowIndex, columnId, value)
    // table.options.meta?.updateDataByRowId?.(rowId, columnId, value)
  }

  //如果 initialValue 被更改为 external，则将其与我们的 state 同步
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  switch (columnId) {
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
          className="p-0 bg-transparent border-none truncate z-20"
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      )
  }
}
