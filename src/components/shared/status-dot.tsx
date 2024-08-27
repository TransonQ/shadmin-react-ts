import { cn } from "@/lib"

interface StatusDotProps {
  label?: string
  className?: string
  bordered?: boolean
}

export function StatusDot({ label, className, bordered }: StatusDotProps) {
  return (
    <span
      className={cn(
        "w-auto inline-flex items-center gap-2 px-2 rounded-full border border-transparent",
        bordered ? "border-input" : ""
      )}
    >
      <span
        className={cn(
          "inline-block flex-shrink-0 w-3 h-3 rounded-full",
          className
        )}
      ></span>
      <span className=" line-clamp-1">{label}</span>
    </span>
  )
}
