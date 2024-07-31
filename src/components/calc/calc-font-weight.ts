import { FontWeight } from "./types"

export const calcFontWeight = (fontWeight?: FontWeight) => {
  switch (fontWeight) {
    case "regular":
      return "font-normal"
    case "medium":
      return "font-medium"
    case "semibold":
      return "font-semibold"
    case "bold":
      return "font-bold"
    default:
      break
  }
}
