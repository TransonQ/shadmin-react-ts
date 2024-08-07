import { ArrowLeftIcon, Loader2Icon } from "lucide-react"
import { isInterface } from "../calc"
import { Button } from "../ui/button"
import { Icon } from "./icon"
import { InlineStack } from "./inline-stack"
import { Text } from "./text"
import type {
  BaseAction,
  DisableableAction,
  IconableAction,
  LoadableAction,
} from "./types"

interface PrimaryAction
  extends LoadableAction,
    DisableableAction,
    IconableAction {}

export interface PageHeaderProps {
  title?: string
  primaryAction?: PrimaryAction | React.ReactNode
  backAction?: BaseAction["onAction"]
}

export const PageHeader = ({
  title,
  primaryAction,
  backAction,
}: PageHeaderProps) => {
  const titleMarkup = title ? (
    <Text as="h1" variant="headingXl" fontWeight="bold">
      {title}
    </Text>
  ) : null

  const backActionMarkup = backAction ? (
    <Button onClick={backAction} variant={"ghost"} className="h-8 w-8 p-0">
      <ArrowLeftIcon className="w-4 h-4 text-secondary-foreground" />
    </Button>
  ) : null

  const primaryActionMarkup = primaryAction ? (
    <PrimaryAction primaryAction={primaryAction} />
  ) : null

  return (
    <InlineStack align="space-between" blockAlign="center" className="mb-4">
      <InlineStack blockAlign="center" gap="sm">
        {backActionMarkup}
        {titleMarkup}
      </InlineStack>
      <InlineStack wrap={false}>{primaryActionMarkup}</InlineStack>
    </InlineStack>
  )
}

function PrimaryAction({
  primaryAction,
}: Pick<PageHeaderProps, "primaryAction">) {
  if (isInterface(primaryAction)) {
    return (
      <Button
        size={"sm"}
        disabled={primaryAction.disabled || primaryAction.loading}
        onClick={primaryAction.onAction}
      >
        <InlineStack gap="md" blockAlign="center">
          {primaryAction.loading ? (
            <Icon source={Loader2Icon} className="animate-spin" />
          ) : (
            primaryAction.icon
          )}
          {primaryAction.content}
        </InlineStack>
      </Button>
    )
  } else {
    return primaryAction
  }
}
