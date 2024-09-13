import { isInterface } from "@/components/lib"
import { Button } from "@/components/ui"
import { Loader2Icon } from "lucide-react"
import { Icon } from "../icon"
import { InlineStack } from "../inline-stack"
import type { ModalProps } from "./types"

export function ModalPrimaryAction({
  primaryAction,
}: {
  primaryAction: ModalProps["primaryAction"]
}) {
  const PrimaryActionMarkup = isInterface(primaryAction) ? (
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
  ) : (
    primaryAction
  )

  return PrimaryActionMarkup
}

export const ModalSecondaryAction = ({
  secondaryAction,
}: {
  secondaryAction: ModalProps["secondaryAction"]
}) => {
  const SecondaryActionMarkup = isInterface(secondaryAction) ? (
    <Button variant={"outline"} onClick={secondaryAction.onAction}>
      {secondaryAction.content}
    </Button>
  ) : (
    secondaryAction
  )

  return SecondaryActionMarkup
}
