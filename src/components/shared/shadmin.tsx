/* eslint-disable react-refresh/only-export-components */
import { cn } from "@/lib"
import type { LucideIcon } from "lucide-react"
import { CheckIcon, XIcon } from "lucide-react"
import { toast as sonnerToast } from "sonner"

function CustomToast({
  onDismiss,
  children,
  icon,
  className,
  variant = "default",
}: {
  onDismiss: () => void
  children: React.ReactNode
  icon: LucideIcon
  className?: string
  variant?: "default" | "destructive"
}) {
  const IconTag = icon
  return (
    <div
      x-chunk="SHADMIN_TOAST"
      className={cn(
        "p-4 rounded-lg shadow-lg bg-card border",
        variant === "destructive" && "border-destructive/50"
      )}
    >
      <div className="flex flex-nowrap justify-between gap-6">
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
          className="h-3 w-3 cursor-pointer shrink-0"
          onClick={onDismiss}
        />
      </div>
    </div>
  )
}

const success = (message: React.ReactNode) =>
  sonnerToast.custom((t) => {
    return (
      <CustomToast
        className="bg-green-700"
        onDismiss={() => sonnerToast.dismiss(t)}
        icon={CheckIcon}
      >
        {message}
      </CustomToast>
    )
  })

const error = (message: React.ReactNode) =>
  sonnerToast.custom((t) => {
    return (
      <CustomToast
        className="bg-red-700"
        onDismiss={() => sonnerToast.dismiss(t)}
        icon={XIcon}
        variant="destructive"
      >
        {message}
      </CustomToast>
    )
  })

const toast = Object.assign(
  {},
  {
    success,
    error,
  }
)

export const shadmin = Object.assign({}, { toast })
