import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Label,
} from "@/components/ui"
import { cn } from "@/lib"
import { isEmpty } from "lodash-es"
import { ChevronDownIcon, PlusIcon } from "lucide-react"
import { useRef, useState, type ReactNode } from "react"
import { MenuDestructableItem } from "../menu-destrucable-item"
import { Show } from "../show"
import type { BaseAction } from "../types"

/** tab 下拉操作类型 */
export type TableTabActionType = "rename" | "edit" | "duplicate" | "delete"

interface TableTabAction extends Omit<BaseAction, "content" | "onAction"> {
  type: TableTabActionType
  /** tab 下拉操作自定义名称 */
  label?: string
  onAction?: (value?: string) => void
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
  const [inputValue, setInputValue] = useState("")
  const [renameActive, setRenameActive] = useState(false)
  const [duplicateActive, setDuplicateActive] = useState(false)
  const [deleteActive, setDeleteActive] = useState(false)
  const actionRef = useRef<any>(null)
  const reset = () => {
    setInputValue("")
    actionRef.current = null
  }

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
                          setRenameActive(true)
                        },
                        onEdit() {},
                        onDuplicate() {
                          setDuplicateActive(true)
                        },
                        onDelete() {
                          setDeleteActive(true)
                        },
                      })
                      actionRef.current = action.onAction
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
      <RenameModal
        open={renameActive}
        value={inputValue}
        onChange={setInputValue}
        onClose={() => {
          setRenameActive(false)
        }}
        onSave={() => {
          if (typeof actionRef.current === "function") {
            const action = actionRef.current
            action(inputValue)
            reset()
          }
          setRenameActive(false)
        }}
      />
      <DuplicateModal
        open={duplicateActive}
        value={inputValue}
        onChange={setInputValue}
        onClose={() => {
          setDuplicateActive(false)
        }}
        onSave={() => {
          if (typeof actionRef.current === "function") {
            const action = actionRef.current
            action(inputValue)
            reset()
          }
          setDuplicateActive(false)
        }}
      />
      <DeleteModal
        open={deleteActive}
        onClose={() => {
          setDeleteActive(false)
        }}
        onSave={() => {
          if (typeof actionRef.current === "function") {
            const action = actionRef.current
            action()
            reset()
          }
          setDeleteActive(false)
        }}
      />
    </div>
  )
}

interface ViewActionModal {
  open: boolean
  onClose?: () => void
  value?: string
  onChange?: (v: string) => void
  onSave?: () => void
}

//~ RenameModal
function RenameModal({
  open,
  value,
  onChange,
  onClose,
  onSave,
}: ViewActionModal) {
  return (
    <ModalDialog
      open={open}
      title="Rename view"
      onClose={onClose}
      primaryAction={{ content: "Rename", onAction: onSave }}
      secondaryAction={{ content: "Cancel", onAction: onClose }}
    >
      <Label>
        {"Name"}
        <Input
          className="mt-1"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </Label>
    </ModalDialog>
  )
}

//~ DuplicateModal
function DuplicateModal({
  open,
  value,
  onChange,
  onClose,
  onSave,
}: ViewActionModal) {
  return (
    <ModalDialog
      title="Duplicate view"
      open={open}
      onClose={onClose}
      primaryAction={{ content: "Duplicate", onAction: onSave }}
      secondaryAction={{ content: "Cancel", onAction: onClose }}
    >
      <Label>
        {"Name"}
        <Input
          className="mt-1"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </Label>
    </ModalDialog>
  )
}

//~ DeleteModal
function DeleteModal({ open, onClose, onSave, value }: ViewActionModal) {
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Delete view?"
      secondaryAction={{ content: "Cancel", onAction: onClose }}
      primaryAction={{ content: "Delete", destructive: true, onAction: onSave }}
    >
      <p>{"This can't be undone. "}</p>
      <p>{`${
        value || "This"
      } view will no longer be available in your admin.`}</p>
    </ModalDialog>
  )
}

function ModalDialog({
  title,
  open,
  onClose,
  children,
  secondaryAction,
  primaryAction,
}: {
  title?: string
  open: boolean
  onClose?: () => void
  children?: ReactNode
  secondaryAction: {
    content: string
    onAction?: () => void
  }
  primaryAction: {
    content: string
    onAction?: () => void
    destructive?: boolean
  }
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-4">{children}</div>
        <DialogFooter className="p-4 flex gap-1">
          <Button variant={"outline"} onClick={secondaryAction.onAction}>
            {secondaryAction.content}
          </Button>
          <Button
            onClick={primaryAction.onAction}
            variant={primaryAction.destructive ? "destructive" : "default"}
          >
            {primaryAction.content}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
