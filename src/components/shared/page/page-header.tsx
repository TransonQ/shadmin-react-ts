import { useMediaQuery } from "@/hooks"
import { ArrowLeftIcon, Loader2Icon } from "lucide-react"
import { isInterface } from "../../lib"
import { Button } from "../../ui/button"
import { Screens } from "../config"
import { Icon } from "../icon"
import { InlineStack } from "../inline-stack"
import { Show } from "../show"
import { Text } from "../text"
import type {
  BaseAction,
  DestructableAction,
  DisableableAction,
  IconableAction,
  LoadableAction,
} from "../types"

interface PrimaryAction
  extends LoadableAction,
    DestructableAction,
    DisableableAction,
    IconableAction {}

interface SecondaryAction
  extends LoadableAction,
    DisableableAction,
    IconableAction {}

export interface PageHeaderProps {
  title?: string
  backAction?: BaseAction["onAction"]
  primaryAction?: PrimaryAction | React.ReactNode
  secondaryActions?: SecondaryAction[] | React.ReactNode
}

export const PageHeader = ({
  title,
  backAction,
  primaryAction,
  secondaryActions,
}: PageHeaderProps) => {
  const TitleMarkup = (
    <Show when={!!title} fallback={null}>
      <Text as="h1" variant="headingXl" fontWeight="bold">
        {title}
      </Text>
    </Show>
  )

  const BackActionMarkup = (
    <Show when={!!backAction} fallback={null}>
      <Button onClick={backAction} variant={"ghost"} className="h-8 w-8 p-0">
        <ArrowLeftIcon className="w-4 h-4 text-secondary-foreground" />
      </Button>
    </Show>
  )

  const PrimaryActionMark = (
    <Show when={!!primaryAction} fallback={null}>
      <PrimaryAction primaryAction={primaryAction} />
    </Show>
  )

  const SecondaryActionsMarkup = (
    <Show when={!!secondaryActions} fallback={null}>
      <SecondaryActions secondaryActions={secondaryActions} />
    </Show>
  )

  return (
    <InlineStack align="space-between" blockAlign="center" className="mb-6">
      <InlineStack blockAlign="center" gap="sm">
        {BackActionMarkup}
        {TitleMarkup}
      </InlineStack>
      <InlineStack wrap={false} gap={"md"}>
        {SecondaryActionsMarkup}
        {PrimaryActionMark}
      </InlineStack>
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
          <Show when={primaryAction.loading} fallback={primaryAction.icon}>
            <Icon source={Loader2Icon} className="animate-spin" />
          </Show>
          {primaryAction.content}
        </InlineStack>
      </Button>
    )
  } else {
    return primaryAction
  }
}

function SecondaryActions({
  secondaryActions,
}: Pick<PageHeaderProps, "secondaryActions">) {
  /** 需要根据屏幕宽度收缩不同的按钮 */
  const md = useMediaQuery(Screens.md)
  console.log("md: ", md)

  if (isInterface(secondaryActions)) {
    return secondaryActions.map((action, idx) => {
      return (
        <Button
          key={idx}
          size={"sm"}
          variant={"secondary"}
          onClick={action.onAction}
        >
          {action.content}
        </Button>
      )
    })
  } else {
    return secondaryActions
  }
}
