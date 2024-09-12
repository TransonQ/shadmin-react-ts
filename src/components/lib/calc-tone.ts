import type { Tone } from "./types"

export const calcTone = (tone?: Tone): string | undefined => {
  switch (tone) {
    case "default":
      return "text-primary-foreground"

    case "subdued":
      return "text-secondary-foreground"

    case "success":
      return "text-green-700"

    case "critical":
      return "text-red-700"

    default:
      break
  }
}
