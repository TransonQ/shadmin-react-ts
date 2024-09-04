import type { BaseAction } from "../../types"

/** tab 下拉操作类型 */
type TableTabActionType = "rename" | "edit" | "duplicate" | "delete"

/** tab 下拉操作 */
export interface TableTabAction
  extends Omit<BaseAction, "content" | "onAction"> {
  type: TableTabActionType
  /** tab 下拉操作自定义名称 */
  label?: string
  onAction?: (value: string) => void
}

export interface TableTab {
  /** 点击 tab 触发可选回调 */
  onAction?(): void
  /** 每个 tab 的唯一标识符 */
  id: string
  /** tab name 展示的内容 */
  content: string
  /** 当前 tab 下的操作列表 */
  actions?: TableTabAction[]
  /** 是否被选中 */
  selected?: boolean
  /** 是否锁定, 如果为 true，将不具备下拉菜单操作视图的功能。 */
  isLocked?: boolean
}

export interface TableTabsProps {
  tabs: TableTab[]
  /** 当前选中的 tab 索引 */
  selected: number
  /** 是否可以新增, 默认 true, 显示"+"按钮  */
  canCreateNewView?: boolean
  /** 输入框值 */
  inputValue?: string
  /** 输入框值变化回调 */
  setInputValue?: (value: string) => void
  /** 新增 tab 激活状态 */
  isNewTabModalOpen?: boolean
  /** 设置新增 tab 激活状态 */
  setNewTabModalOpen?: (value: boolean) => void
  /** 新增 tab 回调 */
  onCreateNewView?: (inputValue?: string) => void
}
