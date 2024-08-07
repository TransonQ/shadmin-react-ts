import type { ClassNameValue } from "tailwind-merge"
import type { CrossAlign } from "./types"

export const calcFlexItems = (itemsAlignProp?: CrossAlign): ClassNameValue => {
  switch (itemsAlignProp) {
    case "start":
      return "items-start"

    case "center":
      return "items-center"

    case "end":
      return "items-end"

    case "stretch":
      return "items-stretch"

    default:
      break
  }
}
