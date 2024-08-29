import { isReactElement } from "@/components/lib"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  Button,
  Input,
  ScrollArea,
  ScrollBar,
} from "@/components/ui"
import { cn } from "@/lib"
import {
  SearchIcon,
  SlidersHorizontalIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react"
import type { ReactNode } from "react"
import { Fragment, useEffect, useRef, useState } from "react"
import { Show } from "../show"
import type { TableTab } from "./table-tabs"
import { TableTabs } from "./table-tabs"

export type FilterMode = "DEFAULT" | "FILTERING"

export type FilterAction = {
  onAction?: (tabName?: string) => void
}

export interface AppliedFilters {
  key: string
  filter: ReactNode
}

interface TableFiltersBarProps {
  queryValue?: string
  queryPlaceholder?: string
  onQueryChange: (queryValue: string) => void
  onQueryClear?: () => void
  filters: AppliedFilters[]
  isFiltered?: boolean
  onClearAllFilters: () => void
  external?: ReactNode
  tabs: TableTab[]
  selected: number
  onSelect?: (tabIndex: number) => void
  createAction?: FilterAction
  updateAction?: FilterAction
  cancelAction?: FilterAction
}

export function TableFiltersBar({
  queryValue,
  queryPlaceholder,
  onQueryChange,
  onQueryClear,
  filters,
  isFiltered,
  onClearAllFilters,
  external,
  tabs,
  selected,
  onSelect,
  createAction,
  updateAction,
  cancelAction,
}: TableFiltersBarProps) {
  const [mode, setMode] = useState<FilterMode>("DEFAULT")
  const isDefaultMode = mode === "DEFAULT"
  const isFilteringMode = mode === "FILTERING"
  const onModeChange = (v: FilterMode) => setMode(v)
  const toggleFiltering = () => setMode(isDefaultMode ? "FILTERING" : "DEFAULT")
  const showClearButton = !!queryValue && typeof onQueryClear === "function"
  const InputRef = useRef<HTMLInputElement>(null)
  const activeTab = tabs[selected]

  // 自动聚焦输入框
  useEffect(() => {
    if (isFilteringMode && InputRef.current) {
      InputRef.current.focus()
    }
  }, [isFilteringMode])

  const handleCreateNewView = () => {
    //TODO - 创建新视图应该传参输入的值
    if (typeof createAction?.onAction === "function") {
      createAction.onAction()
    }
  }
  const handleUpdateView = () => {
    if (typeof updateAction?.onAction === "function") {
      updateAction.onAction()
    }
  }

  //~ onCancel
  const onCancel = () => {
    if (typeof cancelAction?.onAction === "function") {
      cancelAction.onAction(activeTab.content)
    }
    setMode("DEFAULT")
  }

  //~ onSave
  const onSave = () => {
    if (activeTab.isLocked) {
      handleCreateNewView()
    } else {
      handleUpdateView()
    }
    setMode("DEFAULT")
  }

  //~ tabs view
  const DefaultView = (
    <div
      x-chunk="FILTER_DEFAULT"
      className={cn(
        "flex gap-2"
        // isFilteringMode && "hidden"
      )}
    >
      <ScrollArea className="w-full">
        <TableTabs
          tabs={tabs}
          selected={selected}
          setMode={setMode}
          onSelect={onSelect}
          onAddTab={handleCreateNewView}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div x-chunk="TABS_TRIGGER" className="">
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex-shrink-0 px-2"
          onClick={toggleFiltering}
        >
          <SearchIcon className="h-4 w-4" />
          <SlidersHorizontalIcon className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  //~ filters view
  const FilteringView = (
    <div
      x-chunk="FILTER_FILTERING"
      className={cn(
        "flex items-center gap-2"
        // isDefaultMode && "hidden"
      )}
    >
      <div className="relative h-full w-full flex-1">
        <Input
          ref={InputRef}
          placeholder={queryPlaceholder}
          autoFocus={true}
          value={queryValue}
          onChange={(event) => onQueryChange?.(event.target.value)}
          className={cn("h-8 w-full", showClearButton && "pr-8")}
        />
        <Show when={showClearButton}>
          <div
            onClick={() => onQueryClear?.()}
            className="absolute top-0 right-0 h-8 w-8 flex items-center justify-center"
          >
            <XCircleIcon className="h-4 w-4 text-zinc-400 hover:text-muted-foreground" />
          </div>
        </Show>
      </div>
      <Button
        variant={"outline"}
        size={"sm"}
        className="flex-shrink-0 px-2 hover:shadow"
        onClick={onCancel}
      >
        {"Cancel"}
      </Button>
      <Button
        variant={"default"}
        size={"sm"}
        className="flex-shrink-0 px-2 hover:shadow"
        onClick={onSave}
      >
        {activeTab.isLocked ? "Sava as" : "Save"}
      </Button>
    </div>
  )

  return (
    <Accordion
      type="single"
      x-chunk="Accordion"
      className="flex"
      collapsible
      value={mode}
      onValueChange={onModeChange}
    >
      <AccordionItem
        value="FILTERING"
        x-chunk="AccordionItem"
        className="border-none p-2 flex-1 overflow-hidden"
      >
        <Show when={isDefaultMode} fallback={FilteringView}>
          {DefaultView}
        </Show>

        <AccordionContent className="pb-0 pt-2 flex flex-wrap gap-2 items-center">
          {filters.map((f) => {
            if (isReactElement(f.filter)) {
              const Comp = f.filter
              return <Fragment key={f.key}>{Comp}</Fragment>
            }
          })}

          <Show when={isFiltered} fallback={null}>
            <Button
              variant="ghost"
              onClick={onClearAllFilters}
              className="h-7 px-2 text-sm rounded-full "
            >
              {"Reset All"}
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          </Show>
        </AccordionContent>
      </AccordionItem>
      <div x-chunk="FILTER_EXTERNAL" className="py-2 pr-2">
        {external}
      </div>
    </Accordion>
  )
}
