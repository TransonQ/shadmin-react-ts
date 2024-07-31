import { ClassNameValue } from "tailwind-merge"
import { Align } from "./types"

export const calcFlexJustify = (alignProp?: Align): ClassNameValue => {
  let align: ClassNameValue = ""

  switch (alignProp) {
    case "start":
      align = "justify-start"
      break
    case "center":
      align = "justify-center"
      break
    case "end":
      align = "justify-end"
      break
    case "space-around":
      align = "justify-around"
      break
    case "space-between":
      align = "justify-between"
      break
    case "space-evenly":
      align = "justify-evenly"
      break
    default:
      break
  }

  return align
}
