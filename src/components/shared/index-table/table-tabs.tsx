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

interface TableTabAction extends Omit<BaseAction, "content"> {
  type: TableTabActionType
  /** tab 下拉操作自定义名称 */
  label?: string
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
}

export const TableTabs = ({
  tabs,
  selected,
  onSelect,
  canAddTab = true,
}: TableTabsProps) => {
  const updateTabs = tabs.map((tab, idx) => {
    if (idx === selected) {
      return { ...tab, selected: true }
    }
    return { ...tab, selected: false }
  })

  const TabsMarkup = updateTabs.map((tab, idx) => {
    if (tab.selected && !tab.isLocked) {
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
              <ChevronDownIcon className="ml-1 h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Show when={!isEmpty(tab.actions)}>
              {tab.actions?.map((action, actionIdx) => {
                const label = tabAtion({
                  type: action.type,
                  onRename() {
                    return action.label || "Rename"
                  },
                  onEdit() {
                    return action.label || "Edit"
                  },
                  onDuplicate() {
                    return action.label || "Duplicate"
                  },
                  onDelete() {
                    return action.label || "Delete"
                  },
                })
                return (
                  <MenuDestructableItem
                    key={actionIdx}
                    content={label}
                    onAction={() => {
                      tabAtion({
                        type: action.type,
                        onRename() {
                          console.log("rename")
                        },
                        onEdit() {
                          console.log("edit")
                        },
                        onDuplicate() {
                          console.log("duplicate")
                        },
                        onDelete() {
                          console.log("delete")
                        },
                      })
                      action.onAction?.()
                    }}
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

function tabAtion({
  type,
  onRename,
  onEdit,
  onDuplicate,
  onDelete,
  onDefault,
}: {
  type: TableTabActionType
  onRename: () => unknown
  onEdit: () => unknown
  onDuplicate: () => unknown
  onDelete: () => unknown
  onDefault?: () => unknown
}): any {
  switch (type) {
    case "rename":
      return onRename()
    case "edit":
      return onEdit()
    case "duplicate":
      return onDuplicate()
    case "delete":
      return onDelete()
    default:
      return onDefault?.()
  }
}
