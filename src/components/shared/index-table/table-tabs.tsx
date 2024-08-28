import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui"
import { cn } from "@/lib"
import { isEmpty } from "lodash-es"
import { ChevronDownIcon, PlusIcon } from "lucide-react"
import type { ReactNode } from "react"
import { MenuDestructableItem } from "../menu-destrucable-item"
import { Show } from "../show"
import type { BaseAction } from "../types"

/** tab 下拉操作类型 */
export type TableTabActionType = "rename" | "edit" | "duplicate" | "delete"

interface TableTabAction extends BaseAction {
  type: TableTabActionType
}

export interface TableTab {
  /** 点击 tab 触发可选回调 */
  onAction?(): void
  /** 每个 tab 的唯一标识符 */
  id: string
  /** tab 展示的内容 */
  content: ReactNode
  /** 当前 tab 下的操作列表 */
  actions?: TableTabAction[]
  /** 是否被选中 */
  selected?: boolean
  /** 是否锁定, 如果为 true，将删除 编辑/重命名/删除 视图的功能。 */
  isLocked?: boolean
}

interface TableTabsProps {
  tabs: TableTab[]
  /** 当前选中的 tab 索引 */
  selected: number
  /** 选择 tab 回调 */
  onSelect?: (selectedTabIndex: number) => void
  /** 是否可以新增 */
  canAddTab?: boolean
  // /** 是否禁用 */
  // disabled?: boolean
  // /** 是否自适应 */
  // fitted?: boolean
}

export const TableTabs = ({
  tabs,
  selected,
  onSelect,
  canAddTab,
}: TableTabsProps) => {
  const updateTabs = tabs.map((tab, idx) => {
    if (idx === selected) {
      return { ...tab, selected: true }
    }
    return { ...tab, selected: false }
  })

  const TabsMarkup = updateTabs.map((tab, idx) => {
    if (tab.selected) {
      return (
        <DropdownMenu key={tab.id}>
          <DropdownMenuTrigger asChild>
            <Button
              key={tab.id}
              variant={"ghost"}
              size={"sm"}
              className={cn("transition-all", selected === idx && "bg-muted")}
              onClick={() => {
                tab.onAction?.()
                onSelect?.(idx)
              }}
            >
              {tab.content}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Show when={!isEmpty(tab.actions)}>
              {tab.actions?.map((action) => {
                let content = ""
                if (action.type === "rename") {
                  content = "Rename"
                }
                if (action.type === "edit") {
                  content = "Edit"
                }
                if (action.type === "duplicate") {
                  content = "Duplicate"
                }
                if (action.type === "delete") {
                  content = "Delete"
                }
                return (
                  <MenuDestructableItem
                    key={action.id}
                    content={content}
                    onAction={action.onAction}
                    destructive={action.type === "delete"}
                  />
                )
              })}
            </Show>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    return (
      <Button
        key={tab.id}
        variant={"ghost"}
        size={"sm"}
        className={cn(selected === idx && "bg-muted")}
        onClick={() => {
          tab.onAction?.()
          onSelect?.(idx)
        }}
      >
        {tab.content}
      </Button>
    )
  })

  return (
    <div x-chunk="TABS_INDEX" className="w-full flex gap-1">
      {TabsMarkup}
      <Show when={canAddTab} fallback={null}>
        <Button variant={"ghost"} size={"sm"} className={cn("px-2")}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </Show>
    </div>
  )
}
