import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Label
} from "@/components/ui"
import { cn } from "@/lib"
import { isEmpty } from "lodash-es"
import { ChevronDownIcon, PlusIcon } from "lucide-react"
import { useReducer, useRef } from "react"
import { MenuDestructableItem } from "../../menu-destrucable-item"
import { Show } from "../../show"
import { ModalDialog } from "./modal-dialog"
import type { TableTabActionType, TableTabsProps } from "./types"

type TabState = {
  isRenameModalOpen: boolean
  isDuplicateModalOpen: boolean
  isDeleteModalOpen: boolean
}

const init: TabState = {
  isRenameModalOpen: false,
  isDuplicateModalOpen: false,
  isDeleteModalOpen: false,
}

const reducer = (data: TabState, partialData: Partial<TabState>): TabState => {
  return { ...data, ...partialData }
}

export const TableTabs = ({
  tabs,
  selected,
  onSelect,
  canAddTab = true,
  inputValue,
  setInputValue,
  isNewTabModalOpen,
  setNewTabModalOpen,
  onCreateNewView,
}: TableTabsProps) => {
  const actionRef = useRef<any>(null) // 存储遍历 tab 后点击当前 tab 的 action
  const [tabState, setTabState] = useReducer(reducer, init)
  const { isRenameModalOpen, isDuplicateModalOpen, isDeleteModalOpen } =
    tabState
  const selectTabs = tabs.map((tab, idx) => {
    if (idx === selected) {
      return { ...tab, selected: true }
    }
    return { ...tab, selected: false }
  })

  const reset = () => {
    setInputValue?.("")
    actionRef.current = null
  }

  const onActionModalClose = () => {
    setNewTabModalOpen?.(false)
    reset()
    setTabState(init)
  }
  //~ onCreateNewView
  const onSaveNewView = () => {
    onCreateNewView?.(inputValue)
    reset()
    setNewTabModalOpen?.(false)
  }

  //~ onRename
  const onRename = () => {
    if (typeof actionRef.current === "function") {
      const action = actionRef.current
      action(inputValue)
      reset()
    }
    setTabState({ isRenameModalOpen: false })
  }

  //~ onEdit
  // 编辑的时候,不需要 modal,直接触发 tab action

  //~  onDuplicate
  const onDuplicate = () => {
    if (typeof actionRef.current === "function") {
      const action = actionRef.current
      action(inputValue)
      reset()
    }
    setTabState({ isDuplicateModalOpen: false })
  }

  //~ onDelete
  const onDelete = () => {
    if (typeof actionRef.current === "function") {
      const action = actionRef.current
      action()
      reset()
    }
    setTabState({ isDeleteModalOpen: false })
  }

  const TabsMarkup = selectTabs.map((tab, idx) => {
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
                          setInputValue?.(tab.content)
                          setTabState({ isRenameModalOpen: true })
                          actionRef.current = action.onAction
                        },
                        onEdit() {
                          action.onAction?.()
                        },
                        onDuplicate() {
                          setInputValue?.(tab.content)
                          setTabState({ isDuplicateModalOpen: true })
                          actionRef.current = action.onAction
                        },
                        onDelete() {
                          setInputValue?.(tab.content)
                          setTabState({ isDeleteModalOpen: true })
                          actionRef.current = action.onAction
                        },
                      })
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
        <Button
          variant={"ghost"}
          size={"sm"}
          className={cn("px-2")}
          onClick={() => {
            setNewTabModalOpen?.(true)
          }}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </Show>
      <CreateViewModal
        open={!!isNewTabModalOpen}
        value={inputValue}
        onChange={setInputValue}
        onClose={onActionModalClose}
        onSave={onSaveNewView}
      />
      <RenameModal
        open={isRenameModalOpen}
        value={inputValue}
        onChange={setInputValue}
        onClose={onActionModalClose}
        onSave={onRename}
      />
      <DuplicateModal
        open={isDuplicateModalOpen}
        value={inputValue}
        onChange={setInputValue}
        onClose={onActionModalClose}
        onSave={onDuplicate}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={onActionModalClose}
        onSave={onDelete}
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

//~ CreateViewModal
function CreateViewModal({
  open,
  value,
  onChange,
  onClose,
  onSave,
}: ViewActionModal) {
  return (
    <ModalDialog
      open={open}
      title="Create new view"
      onClose={onClose}
      primaryAction={{ content: "Create view", onAction: onSave }}
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
      primaryAction={{ content: "Rename view", onAction: onSave }}
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
      primaryAction={{ content: "Create view", onAction: onSave }}
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
      primaryAction={{
        content: "Delete view",
        destructive: true,
        onAction: onSave,
      }}
    >
      <p>{"This can't be undone. "}</p>
      <p>{`${
        value || "This"
      } view will no longer be available in your admin.`}</p>
    </ModalDialog>
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
