import type { PageWidth } from "./types"

export const calcPageWidth = (width: PageWidth) => {
  switch (width) {
    case "narrowWidth":
      return "max-w-prose"

    case "formWidth":
      return "max-w-screen-md"

    case "fullWidth":
      return "max-w-full"

    case "defaultWidth":
    default:
      return "max-w-screen-lg"
  }
}
