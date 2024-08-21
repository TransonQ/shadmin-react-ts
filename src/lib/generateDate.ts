export function generateDate(n: number) {
  const now = new Date()
  const date = new Date(now.setDate(now.getDate() - n))

  return { date, dateISOString: date.toISOString().split("T") }
}
