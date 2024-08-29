import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui"
import type { ReactNode } from "react"

export function ModalDialog({
  title,
  open,
  onClose,
  children,
  secondaryAction,
  primaryAction,
}: {
  title?: string
  open: boolean
  onClose?: () => void
  children?: ReactNode
  secondaryAction: {
    content: string
    onAction?: () => void
  }
  primaryAction: {
    content: string
    onAction?: () => void
    destructive?: boolean
    disabled?: boolean
  }
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-4">{children}</div>
        <DialogFooter className="p-4 flex gap-1">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={secondaryAction.onAction}
          >
            {secondaryAction.content}
          </Button>
          <Button
            size={"sm"}
            onClick={primaryAction.onAction}
            variant={primaryAction.destructive ? "destructive" : "default"}
            disabled={primaryAction.disabled}
          >
            {primaryAction.content}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
