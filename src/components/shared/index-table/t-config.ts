import type { Row } from "@tanstack/react-table"

/**
 * @name getRowId
 * @description 自定义获取选择行的 id
 */
function getRowId<TData extends { id: string }>(
  originalRow: TData,
  index: number,
  parent?: Row<TData>
) {
  return originalRow.id
}

export const tConfig = Object.assign({}, { getRowId })
