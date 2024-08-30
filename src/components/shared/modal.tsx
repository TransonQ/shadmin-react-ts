import { cn } from "@/lib"
import { Loader2Icon, XIcon } from "lucide-react"
import React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button, buttonVariants } from "../ui/button"
import { Icon } from "./icon"
import { InlineStack } from "./inline-stack"
import type {
  BaseAction,
  DestructableAction,
  DisableableAction,
  LoadableAction,
} from "./types"

interface PrimaryAction
  extends LoadableAction,
    DisableableAction,
    LoadableAction,
    DestructableAction {}

interface SecondaryAction extends BaseAction {}

interface ModalProps {
  type?: "alert" | "dialog"
  children?: React.ReactNode
  title?: string
  open?: boolean
  onClose?: (open?: boolean) => void
  primaryAction?: PrimaryAction
  secondaryAction?: SecondaryAction
}

export const Modal = ({
  type = "dialog",
  title,
  children,
  open,
  onClose,
  primaryAction,
  secondaryAction,
}: ModalProps) => {
  const SecondaryActionMarkup = secondaryAction ? (
    <Button variant={"outline"} onClick={secondaryAction.onAction}>
      {secondaryAction.content}
    </Button>
  ) : null

  const PrimaryActionMarkup = primaryAction ? (
    <Button
      variant={primaryAction.destructive ? "destructive" : "default"}
      disabled={primaryAction.loading || primaryAction.disabled}
      onClick={primaryAction.onAction}
    >
      <InlineStack blockAlign="center" gap="md">
        {primaryAction.loading ? (
          <Icon source={Loader2Icon} className="animate-spin" />
        ) : null}
        {primaryAction.content}
      </InlineStack>
    </Button>
  ) : null

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogDescription className="sr-only">
          {
            "Modal: This is a pop-up box used to display additional information or operation options."
          }
        </AlertDialogDescription>
        <AlertDialogHeader className="p-4 border-b">
          <InlineStack className="min-h-6">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <XIcon
              onClick={() => onClose?.()}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "p-2 h-8 w-8",
                "absolute right-3 top-3",
                "hover:cursor-pointer"
              )}
            />
          </InlineStack>
        </AlertDialogHeader>

        {children}

        <AlertDialogFooter className="p-4">
          <InlineStack align="end" gap="md">
            {SecondaryActionMarkup}
            {PrimaryActionMarkup}
          </InlineStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
