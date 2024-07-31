import { ClassNameValue } from "tailwind-merge"
import { CrossAlign } from "./types"

export const calcFlexItems = (itemsAlignProp?: CrossAlign): ClassNameValue => {
  let itemsAlign: ClassNameValue = ""
  switch (itemsAlignProp) {
    case "start":
      itemsAlign = "items-start"
      break
    case "center":
      itemsAlign = "items-center"
      break
    case "end":
      itemsAlign = "items-end"
      break
    case "stretch":
      itemsAlign = "items-stretch"
      break
    default:
      break
  }

  return itemsAlign
}
