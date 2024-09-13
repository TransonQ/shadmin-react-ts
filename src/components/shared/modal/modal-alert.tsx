import { cn } from "@/lib"
import { XIcon } from "lucide-react"
import React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog"
import { buttonVariants } from "../../ui/button"
import { InlineStack } from "../inline-stack"
import { ModalPrimaryAction, ModalSecondaryAction } from "./modal-actions"
import type { ModalProps } from "./types"

export const ModalAlert = ({
  title,
  children,
  open,
  onClose,
  primaryAction,
  secondaryAction,
}: ModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader className="p-4 border-b relative">
          <InlineStack className="-my-1">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <XIcon
              onClick={() => onClose?.()}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "p-1 h-6 w-6",
                "absolute right-3 top-3",
                "hover:cursor-pointer"
              )}
            />
          </InlineStack>
          <AlertDialogDescription className="sr-only">
            {
              "Modal: This is a pop-up box used to display additional information or operation options."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>

        {children}

        <AlertDialogFooter className="p-4">
          <InlineStack align="end" gap="md">
            <ModalSecondaryAction secondaryAction={secondaryAction} />
            <ModalPrimaryAction primaryAction={primaryAction} />
          </InlineStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const ModalAlertSection = ({
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
