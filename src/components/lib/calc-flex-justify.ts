import type { ClassNameValue } from "tailwind-merge"
import type { Align } from "./types"

export const calcFlexJustify = (alignProp?: Align): ClassNameValue => {
  switch (alignProp) {
    case "start":
      return "justify-start"

    case "center":
      return "justify-center"

    case "end":
      return "justify-end"

    case "space-around":
      return "justify-around"

    case "space-between":
      return "justify-between"

    case "space-evenly":
      return "justify-evenly"

    default:
      break
  }
}
