/* eslint-disable react-refresh/only-export-components */
import { cn } from "@/lib";
import type { LucideIcon } from "lucide-react";
import { CheckIcon, XIcon } from "lucide-react";
import { toast as sonnerToast } from "sonner";

function CustomToast({
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
        "flex flex-nowrap justify-between gap-6"
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


export const shadmin =  Object.assign({}, {toast})

