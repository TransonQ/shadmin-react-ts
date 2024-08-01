import { cn } from "@/lib"
import { Loader2Icon, XIcon } from "lucide-react"
import React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button, buttonVariants } from "../ui/button"
import { Icon } from "./icon"
import { InlineStack } from "./inline-stack"
import {
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
  children?: React.ReactNode
  title?: string
  open?: boolean
  onClose?: (open?: boolean) => void
  primaryAction?: PrimaryAction
  secondaryAction?: SecondaryAction
}

const ModalDefault = ({
  title,
  children,
  open,
  onClose,
  primaryAction,
  secondaryAction,
}: ModalProps) => {
  const SecondaryActionMarkup = secondaryAction ? (
    <Button size={"sm"} variant={"outline"} onClick={secondaryAction.onAction}>
      {secondaryAction.content}
    </Button>
  ) : null

  const PrimaryActionMarkup = primaryAction ? (
    <Button
      size={"sm"}
      variant={primaryAction.destructive ? "destructive" : "default"}
      disabled={primaryAction.loading || primaryAction.disabled}
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
        <AlertDialogHeader className="p-4 border-b">
          <InlineStack>
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

        <AlertDialogFooter className="p-4 border-t">
          <InlineStack align="end" gap="md">
            {SecondaryActionMarkup}
            {PrimaryActionMarkup}
          </InlineStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const ModalSection = ({
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

export const Modal = Object.assign(ModalDefault, {
  Section: ModalSection,
})
