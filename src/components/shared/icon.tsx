import { cn } from "@/lib"
import { LucideIcon } from "lucide-react"

export const Icon = ({
  source,
  className,
}: {
  source: LucideIcon
  className?: string
}) => {
  const IconMatrk = source
  return <IconMatrk className={cn("w-4 h-4", className)} />
}
