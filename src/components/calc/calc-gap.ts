import { Gap } from "./types"

export const calcGap = (gapStr?: Gap) => {
  switch (gapStr) {
    case "sm":
      return "gap-1"
    case "md":
      return "gap-2"
    case "lg":
      return "gap-4"
    case "xl":
      return "gap-8"
    default:
      break
  }
}
