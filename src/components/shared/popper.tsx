import { cn } from "@/lib"
import type { LucideIcon} from "lucide-react";
import { CheckIcon, XIcon } from "lucide-react"
import { toast } from "sonner"

// eslint-disable-next-line react-refresh/only-export-components
function Popper({
  onDismiss,
  children,
  icon,
  className,
}: {
  onDismiss: () => void
  children: React.ReactNode
  icon: LucideIcon
  className?: string
}) {
  const IconTag = icon
  return (
    <div
      className={cn(
        "p-3 rounded-lg bg-card shadow-lg",
        "flex flex-nowrap justify-between gap-6 min-w-[300px]"
      )}
    >
      <div className="flex gap-4 items-center">
        <IconTag
          className={cn(
            "p-1 h-5 w-5 text-primary-foreground rounded-full shrink-0",
            className
          )}
        />
        {children}
      </div>

      <XIcon
        className="h-3 w-3 cursor-pointer -mr-1 shrink-0"
        onClick={onDismiss}
      />
    </div>
  )
}

const success = (message: React.ReactNode) =>
  toast.custom((t) => {
    return (
      <Popper
        className="bg-green-700"
        onDismiss={() => toast.dismiss(t)}
        icon={CheckIcon}
      >
        {message}
      </Popper>
    )
  })

const error = (message: React.ReactNode) =>
  toast.custom((t) => {
    return (
      <Popper
        className="bg-red-700"
        onDismiss={() => toast.dismiss(t)}
        icon={XIcon}
      >
        {message}
      </Popper>
    )
  })

export const popper = Object.assign(
  {},
  {
    success,
    error,
  }
)
