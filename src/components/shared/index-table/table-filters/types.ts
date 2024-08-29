import type { ReactNode } from "react"
import type { TableTab } from "../table-tabs"

export enum ModeEnum {
  default = "DEFAULT",
  filtering = "FILTERING",
}

export type FilterMode = ModeEnum.default | ModeEnum.filtering

export interface AppliedFilters {
  key: string
  filter: ReactNode
}

export interface TableFiltersProps {
  /** 搜索输入 */
  queryValue?: string
  /** 搜索输入的 placeholder */
  queryPlaceholder?: string
  /** 搜索输入回调 */
  onQueryChange: (queryValue: string) => void
  /** 清空搜索回调 */
  onQueryClear?: () => void
  /** 筛选项数组 */
  filters: AppliedFilters[]
  /** 是否处于筛选状态,如果为 true, 那么展示清空所有筛选按钮 */
  isFiltered?: boolean
  /** 清空所有筛选按钮的回调 */
  onClearAllFilters: () => void
  /** 预留自定义位置: 比如 columns 选项的组件 */
  external?: ReactNode
  /** tab 数组 */
  tabs: TableTab[]
  /** 当前选中的 tab 索引 */
  selected: number
  /** 选择 tab 时的回调 */
  onSelect?: (tabIndex: number) => void
  /** 创建视图 */
  onCreateView?: (newTabName: string) => void
  /** 保存视图 */
  onSaveView?: () => void
  /** 取消视图操作 */
  onCancel?: () => void
  /** 当前的筛选组件的模式: 默认模式-展示 tabs, 筛选模式-展示输入框和筛选项 */
  mode: FilterMode
  /** 切换筛选模式 */
  setMode: (mode: FilterMode) => void
}
