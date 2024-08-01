// 定义函数 `generateArray`，可以接受两种形式的第二个参数
export function generateArray<T>(
  length: number,
  itemOrCallback: T | ((i: number) => T)
): T[] {
  return Array.from({ length }, (_, i) =>
    typeof itemOrCallback === "function"
      ? (itemOrCallback as (i: number) => T)(i)
      : itemOrCallback
  )
}
