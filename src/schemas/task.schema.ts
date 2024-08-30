import { z } from "zod"

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  created_at: z.date(),
})

export type Task = z.infer<typeof taskSchema>
