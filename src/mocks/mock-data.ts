import { generateArray } from "@/lib"
import { UserIcon } from "lucide-react"

export const mockNavs = generateArray(10, (i) => ({
  label: `Lorem ipsum ${i + 1}`,
  icon: UserIcon,
}))
