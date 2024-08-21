/**
 * 生成日期
 * @param n 偏移量，单位为天.
 * @example generateDate(10) 生成 10 天前的日期
 * @example generateDate(-10) 生成 10 天后的日期
 * @returns { date: Date, dateISOString: string[] }
 */
export function generateDate(n: number) {
  const now = new Date()
  const date = new Date(now.setDate(now.getDate() - n))

  return { date, dateISOString: date.toISOString().split("T") }
}
