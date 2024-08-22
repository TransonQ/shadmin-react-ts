import { z } from "zod"

export const formSchema = z.object({
  accountName: z
    .string()
    .min(1, { message: "Please enter an account name" })
    .default(""),
  accountAddress: z.string(),
  description: z.string().optional(),
  amount: z.coerce.number({ message: "Please enter an amount" }).min(1, {
    message: "Please enter a valid number",
  }),
  currency: z.enum(["CNY", "USD", "EUR", "GBP", "JPY"]),
  date: z.coerce.date({ message: "Please enter a valid date string" }),
  note: z.string().optional(),
})
