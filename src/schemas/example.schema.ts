import { z } from "zod"

export const exampleSchema = z.object({
  name: z.string(),
  age: z.number(),
})
type S = typeof exampleSchema

export type ExampleSchema = z.infer<S>
export type ExampleSchemaFmtError = z.inferFormattedError<S>
export type ExampleSchemaFlatError = z.inferFlattenedErrors<S>
