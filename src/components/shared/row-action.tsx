import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui"
import { isMatrix } from "@/lib"
import { isEmpty } from "lodash-es"
import { MoreHorizontalIcon } from "lucide-react"
import { Icon } from "./icon"
import { Show } from "./show"
import type {
  DestructableAction,
  DisableableAction,
  HiddableAction,
} from "./types"

interface RowActionItem
  extends DisableableAction,
    HiddableAction,
    DestructableAction {}

interface RowActionProps extends RowActionItem {
  /** Optional label */
  label?: string
  /** Actions */
  actions: RowActionItem[]
  /** Sections: groups of actions
   *  @example
   * [
   *    [{content: "Edit1"}, {content: "Edit2"}}]
   *    [{content: "Edit3"}]
   * ]
   */
  sections?: RowActionItem[][]
}

export const RowAction = ({ label, actions, sections }: RowActionProps) => {
  const noActions = isEmpty(actions)
  const noSections =
    isEmpty(sections) || sections?.every((section) => isEmpty(section))

  const ActionsMarkup = actions
    .filter((action) => !action.hidden)
    .map((action, idx) => {
      return (
        <DropdownMenuItem
          key={idx}
          onClick={action.onAction}
          disabled={action.disabled}
        >
          {action.content}
        </DropdownMenuItem>
      )
    })

  const SectionsMarkup =
    isMatrix(sections) &&
    sections?.map((section, index) => {
      if (section.every((action) => action.hidden)) return null
      return (
        <div key={index}>
          <Show when={!(noActions && index === 0)} fallback={null}>
            <DropdownMenuSeparator />
          </Show>
          {section
            .filter((action) => !action.hidden)
            .map((action, idx) => {
              return (
                <div key={idx}>
                  <DropdownMenuItem
                    key={action.content}
                    onClick={action.onAction}
                    disabled={action.disabled}
                  >
                    {action.content}
                  </DropdownMenuItem>
                </div>
              )
            })}
        </div>
      )
    })

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="p-0 w-8 h-8"
            size={"icon"}
            variant="ghost"
            disabled={noActions && noSections}
          >
            <span className="sr-only">Open menu</span>
            <Icon source={MoreHorizontalIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
          {ActionsMarkup}
          {SectionsMarkup}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
