import { Variant } from "./types"

export const calcTextVariant = (variant?: Variant) => {
  switch (variant) {
    // The heading font size overlaps the body: heading defaults to font-semibold
    case "headingXs":
      return "text-xs font-semibold"

    case "headingSm":
      return "text-sm font-semibold"

    case "headingMd":
      return "text-md font-semibold"

    case "headingLg":
      return "text-lg font-semibold"

    // Font size heading unique part
    case "headingXl":
      return "text-xl"

    case "heading2xl":
      return "text-2xl"

    case "heading3xl":
      return "text-3xl"

    // body text
    case "bodyXs":
      return "text-xs"

    case "bodySm":
      return "text-sm"

    case "bodyMd":
      return "text-md"

    case "bodyLg":
      return "text-lg"

    default:
      return "text-md"
  }
}
