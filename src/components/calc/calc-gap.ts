import { Gap } from "./types"

export const calcGap = (gapStr?: Gap) => {
  switch (gapStr) {
    case "sm":
      return "gap-2"
    case "md":
      return "gap-4"
    case "lg":
      return "gap-8"
    case "xl":
      return "gap-12"
    default:
      break
  }
}
