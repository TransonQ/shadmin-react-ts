import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui"
import { cn } from "@/lib"
import { InlineStack } from "../inline-stack"
import { ModalPrimaryAction, ModalSecondaryAction } from "./modal-actions"
import type { ModalProps } from "./types"

export function Modal({
  title,
  children,
  open,
  onClose,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="border-b">
          <DialogTitle className="p-4">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {
              "Modal: This is a pop-up box used to display additional information or operation options."
            }
          </DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter className="p-4">
          <InlineStack align="end" gap="md">
            <ModalSecondaryAction secondaryAction={secondaryAction} />
            <ModalPrimaryAction primaryAction={primaryAction} />
          </InlineStack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const ModalSection = ({
  children,
  className,
  bordered,
}: {
  children?: React.ReactNode
  className?: string
  bordered?: boolean
}) => {
  return (
    <div className={cn("p-4", bordered && "border-b", className)}>
      {children}
    </div>
  )
}
