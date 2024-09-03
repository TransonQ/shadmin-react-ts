import type { TableTab } from "../table-tabs"

export type Updater<T> = T | ((old: T) => T)
interface UseTableTabsConfig {
  itemString: string[]
  setItemString: (value: Updater<string[]>) => void
  lockedTabs: string[]
  onTabChange?: (tabLabel: string, index: number) => void
  onRenameTab?: (prevTabLabel: string, tabLabel: string) => void
  onEditTab?: () => void
  onDuplicateTab?: (tabLabel: string) => void
  onDeleteTab?: (index: number) => void
}

export function useTableTabs({
  lockedTabs,
  itemString,
  setItemString,
  onTabChange,
  onRenameTab,
  onEditTab,
  onDuplicateTab,
  onDeleteTab,
}: UseTableTabsConfig) {
  const tabs: TableTab[] = itemString.map((item, idx) => ({
    content: item,
    id: `${item}-${idx}`,
    isLocked: lockedTabs.includes(item),
    onAction: () => {
      onTabChange?.(item, idx)
    },
    actions: [
      {
        type: "rename",
        onAction: (value) => {
          let oldValue = ""
          setItemString((itemString) => {
            const newItemsStrings = itemString.map((item, index) => {
              if (idx === index) {
                oldValue = item
                return value as string
              }
              return item
            })
            return newItemsStrings
          })
          onRenameTab?.(oldValue, value)
        },
      },
      {
        type: "edit",
        onAction: onEditTab,
      },
      {
        type: "duplicate",
        onAction: (value) => {
          setItemString([...itemString, value as string])
          onDuplicateTab?.(value)
        },
      },
      {
        type: "delete",
        onAction: () => {
          setItemString(itemString.filter((_, index) => index !== idx))
          onDeleteTab?.(idx)
        },
      },
    ],
  }))

  return {
    tabs,
  }
}
