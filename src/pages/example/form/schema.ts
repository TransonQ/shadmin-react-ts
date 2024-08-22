import { z } from "zod"

export const formSchema = z.object({
  accountName: z.string(),
  accountAddress: z.string(),
  description: z.string().optional(),
  amount: z.coerce.number(),
  currency: z.enum(["CNY", "USD", "EUR", "GBP", "JPY"]),
  date: z.coerce.date({ message: "Please enter a valid date string" }),
})
