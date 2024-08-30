import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Label,
} from "@/components/ui"
import { cn } from "@/lib"
import { isEmpty } from "lodash-es"
import { AlertCircleIcon, ChevronDownIcon, PlusIcon } from "lucide-react"
import { useReducer, useRef } from "react"
import { MenuDestructableItem } from "../../menu-destrucable-item"
import { Show } from "../../show"
import { ModalDialog } from "./modal-dialog"
import type { TableTab, TableTabAction, TableTabsProps } from "./types"

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

  const currentActionLabel = (action: TableTabAction) => {
    switch (action.type) {
      case "rename":
        return action.label || "Rename"
      case "edit":
        return action.label || "Edit"
      case "duplicate":
        return action.label || "Duplicate"
      case "delete":
        return action.label || "Delete"
      default:
        return ""
    }
  }

  const currentTabAction = (tab: TableTab, action: TableTabAction) => {
    switch (action.type) {
      case "rename": {
        setInputValue?.(tab.content)
        setTabState({ isRenameModalOpen: true })
        actionRef.current = action.onAction
        break
      }
      case "edit": {
        action.onAction?.("")
        break
      }
      case "duplicate": {
        setInputValue?.("copy of " + tab.content)
        setTabState({ isDuplicateModalOpen: true })
        actionRef.current = action.onAction
        break
      }
      case "delete": {
        setInputValue?.(tab.content)
        setTabState({ isDeleteModalOpen: true })
        actionRef.current = action.onAction
        break
      }
      default:
        break
    }
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
              }}
            >
              {tab.content}
              <ChevronDownIcon className="ml-1 h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Show when={!isEmpty(tab.actions)}>
              {tab.actions?.map((action, actionIdx) => {
                const label = currentActionLabel(action)

                return (
                  <MenuDestructableItem
                    key={actionIdx}
                    content={label}
                    onAction={() => currentTabAction(tab, action)}
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
        tabs={tabs}
        open={!!isNewTabModalOpen}
        value={inputValue}
        onChange={setInputValue}
        onClose={onActionModalClose}
        onSave={onSaveNewView}
      />
      <RenameModal
        tabs={tabs}
        selected={selected}
        open={isRenameModalOpen}
        value={inputValue}
        onChange={setInputValue}
        onClose={onActionModalClose}
        onSave={onRename}
      />
      <DuplicateModal
        tabs={tabs}
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
  tabs?: TableTab[]
  selected?: number
}

function ErrorMessage({ children }: { children: string }) {
  return (
    <p className="mt-2 text-destructive flex gap-2 items-center">
      <AlertCircleIcon className="h-4 w-4" />
      <span>{children}</span>
    </p>
  )
}

//~ CreateViewModal
function CreateViewModal({
  open,
  value,
  onChange,
  onClose,
  onSave,
  tabs = [],
}: ViewActionModal) {
  const isValidInput = tabs.some((tab) => tab.content?.trim() === value?.trim())

  return (
    <ModalDialog
      open={open}
      title="Create new view"
      onClose={onClose}
      primaryAction={{
        content: "Create view",
        onAction: onSave,
        disabled: !value?.trim() || isValidInput,
      }}
      secondaryAction={{ content: "Cancel", onAction: onClose }}
    >
      <Label>
        {"Name"}
        <Input
          data-invalid={isValidInput}
          className={cn("mt-1", "data-[invalid=true]:border-destructive")}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <Show when={isValidInput}>
          <ErrorMessage>{"A view with this name already exists."}</ErrorMessage>
        </Show>
      </Label>
    </ModalDialog>
  )
}

//~ RenameModal
function RenameModal({
  tabs = [],
  selected,
  open,
  value,
  onChange,
  onClose,
  onSave,
}: ViewActionModal) {
  const resetTabs = tabs.filter((_, idx) => idx !== selected)
  const isValidInput = resetTabs.some(
    (tab) => tab.content?.trim() === value?.trim()
  )

  return (
    <ModalDialog
      open={open}
      title="Rename view"
      onClose={onClose}
      primaryAction={{
        content: "Rename view",
        onAction: onSave,
        disabled: !value?.trim() || isValidInput,
      }}
      secondaryAction={{ content: "Cancel", onAction: onClose }}
    >
      <Label>
        {"Name"}
        <Input
          data-invalid={isValidInput}
          className={cn("mt-1", "data-[invalid=true]:border-destructive")}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <Show when={isValidInput}>
          <ErrorMessage>{"A view with this name already exists."}</ErrorMessage>
        </Show>
      </Label>
    </ModalDialog>
  )
}

//~ DuplicateModal
function DuplicateModal({
  tabs = [],
  open,
  value,
  onChange,
  onClose,
  onSave,
}: ViewActionModal) {
  const isValidInput = tabs.some((tab) => tab.content?.trim() === value?.trim())

  return (
    <ModalDialog
      title="Duplicate view"
      open={open}
      onClose={onClose}
      primaryAction={{
        content: "Create view",
        onAction: onSave,
        disabled: !value?.trim() || isValidInput,
      }}
      secondaryAction={{ content: "Cancel", onAction: onClose }}
    >
      <Label>
        {"Name"}
        <Input
          data-invalid={isValidInput}
          className={cn("mt-1", "data-[invalid=true]:border-destructive")}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <Show when={isValidInput}>
          <ErrorMessage>{"A view with this name already exists."}</ErrorMessage>
        </Show>
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
