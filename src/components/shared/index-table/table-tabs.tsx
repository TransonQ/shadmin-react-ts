import { Button } from "@/components/ui"
import { cn } from "@/lib"
import { PlusIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Show } from "../show"
import type { BaseAction } from "../types"

/** tab 下拉操作类型 */
export type TableTabActionType = "rename" | "edit" | "duplicate" | "delete"

interface TableTabAction extends BaseAction {
  type: TableTabActionType
}

interface TableTab {
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
  const TabsMarkup = tabs.map((tb, idx) => {
    return (
      <Button
        key={tb.id}
        variant={"ghost"}
        size={"sm"}
        className={cn(selected === idx && "bg-muted")}
        onClick={() => {
          tb.onAction?.()
          onSelect?.(idx)
        }}
      >
        {tb.content}
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
