type Matrix<T> = T[][]

export function isMatrix<T>(arr: any): arr is Matrix<T> {
  if (!Array.isArray(arr)) return false

  return arr.every((row: any) => Array.isArray(row))
}
