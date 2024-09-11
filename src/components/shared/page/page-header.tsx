import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import { TooltipContent } from "@radix-ui/react-tooltip"
import { ArrowLeftIcon, EllipsisIcon, Loader2Icon } from "lucide-react"
import { isInterface } from "../../lib"
import { Button } from "../../ui/button"
import { Screens, useMediaQuery } from "../frame"
import { Icon } from "../icon"
import { InlineStack } from "../inline-stack"
import { MenuItem } from "../menu-item"
import { Show } from "../show"
import { Text } from "../text"
import type {
  BaseAction,
  DestructableAction,
  DisableableAction,
  IconableAction,
  LoadableAction,
  PinnableAction,
} from "../types"

interface PrimaryAction
  extends LoadableAction,
    DestructableAction,
    DisableableAction,
    IconableAction,
    PinnableAction {}

interface SecondaryAction
  extends LoadableAction,
    DisableableAction,
    DestructableAction,
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
  const md = useMediaQuery(Screens.md)

  const TitleLabel = (
    <Text
      as="h1"
      variant="headingXl"
      fontWeight="bold"
      className="line-clamp-1 text-left"
    >
      {title}
    </Text>
  )
  const TitleMarkup = (
    <Show when={!md} fallback={TitleLabel}>
      <TooltipProvider>
        <Show when={!!title} fallback={null}>
          <Tooltip>
            <TooltipTrigger>{TitleLabel}</TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-card py-2 px-4 border rounded-md shadow-md"
            >
              {title}
            </TooltipContent>
          </Tooltip>
        </Show>
      </TooltipProvider>
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
    <div
      x-chunk="PAGE_HEADER"
      className="mb-8 flex items-center justify-between"
    >
      <InlineStack blockAlign="center" gap="sm">
        {BackActionMarkup}
        {TitleMarkup}
      </InlineStack>
      <InlineStack wrap={false} gap={"md"}>
        {SecondaryActionsMarkup}
        {PrimaryActionMark}
      </InlineStack>
    </div>
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
  const md = useMediaQuery(Screens.md)

  if (isInterface(secondaryActions)) {
    if (md) {
      return secondaryActions.map((action, idx) => {
        return (
          <Button
            key={idx}
            size={"sm"}
            variant={action.destructive ? "destructive-outline" : "secondary"}
            onClick={action.onAction}
            disabled={action.disabled || action.loading}
            className="flex gap-1"
          >
            <Show when={action.loading} fallback={action.icon}>
              <Loader2Icon className="w-4 h-4 animate-spin" />
            </Show>
            {action.content}
          </Button>
        )
      })
    } else {
      // 小屏幕收缩
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"sm"}>
              <EllipsisIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {secondaryActions.map((action, idx) => {
              return (
                <MenuItem
                  key={idx}
                  onAction={action.onAction}
                  loading={action.loading}
                  icon={action.icon}
                  content={action.content}
                  disabled={action.disabled}
                  destructive={action.destructive}
                />
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  } else {
    return secondaryActions
  }
}
