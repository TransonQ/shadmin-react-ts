import { cn } from "@/lib"
import { CheckIcon, XIcon } from "lucide-react"
import { toast } from "sonner"

const success = (message: React.ReactNode) =>
  toast.custom((t) => {
    return (
      <div
        className={cn(
          "p-3 rounded-lg bg-background border shadow-lg",
          "flex flex-nowrap justify-between gap-6"
        )}
      >
        <div className="flex gap-4 items-center">
          <CheckIcon className="p-1 h-6 w-6 text-primary-foreground bg-green-700 rounded-full shrink-0" />
          {message}
        </div>

        <XIcon
          className="h-4 w-4 cursor-pointer -mr-1"
          onClick={() => toast.dismiss(t)}
        />
      </div>
    )
  })

const error = (message: React.ReactNode) =>
  toast.custom((t) => {
    return (
      <div
        className={cn(
          "p-3 rounded-lg bg-background border shadow-lg",
          "flex flex-nowrap justify-between gap-6"
        )}
      >
        <div className="flex gap-4 items-center">
          <XIcon className="p-1 h-6 w-6 text-primary-foreground bg-red-700 rounded-full shrink-0" />
          {message}
        </div>

        <XIcon
          className="h-4 w-4 cursor-pointer -mr-1"
          onClick={() => toast.dismiss(t)}
        />
      </div>
    )
  })

export const popper = Object.assign(
  {},
  {
    success,
    error,
  }
)
