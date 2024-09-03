import {
  Button,
  Checkbox,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui"
import { cn } from "@/lib"
import type { Column, Table } from "@tanstack/react-table"
import { Columns3Icon, GripVerticalIcon } from "lucide-react"
import type { CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"
import { Show } from "../show"

import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type OptionConfig = {
  /** 自定义获取列标题:根据 id 获取列的标题 */
  getColumnTitle?: (columnId: any) => string
  /** 排除指定的列: 这些列通常是不需要参与拖拽和展示的, 比如定义的包含选择框的列和包含操作的列 */
  excludeColumnIds?: string[]
}

interface TableColumnOptionsProps<TData> {
  table: Table<TData>
  config?: OptionConfig
}

export function TableColumnOptions<TData>({
  table,
  config,
}: TableColumnOptionsProps<TData>) {
  const tableColumnOrder = table.getState().columnOrder
  const allColumns = table.getAllColumns()
  const columnsRef = useRef(allColumns)

  const [sortColumns, setSortColumns] = useState(columnsRef.current)

  useEffect(() => {
    setSortColumns(sortByOrders(columnsRef.current, tableColumnOrder))
  }, [tableColumnOrder])

  useEffect(() => {
    console.log("allColumns: ", allColumns)
  }, [allColumns])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setSortColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        const newItems = arrayMove(items, oldIndex, newIndex)
        const newOrder = newItems.map((item) => item.id)
        table.setColumnOrder(newOrder)
        return newItems
      })
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 flex px-2">
          <Columns3Icon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        // style={{ width: width }}
        className="p-0"
        align="end"
      >
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={sortColumns}
            strategy={verticalListSortingStrategy}
          >
            {sortColumns.map((item) => {
              if (Array.isArray(config?.excludeColumnIds)) {
                // 对于排除的列不展示在列选项中, 不参与拖拽
                if (config.excludeColumnIds.includes(item.id)) return null
              }
              return (
                <SortItem
                  key={item.id}
                  id={item.id}
                  checked={item.getIsVisible()}
                  onChange={(value) => item.toggleVisibility(!!value)}
                  disabled={item.getCanHide() === false}
                >
                  <Show
                    when={typeof config?.getColumnTitle === "function"}
                    fallback={<span>{item.id}</span>}
                  >
                    <span>{config?.getColumnTitle?.(item.id)}</span>
                  </Show>
                </SortItem>
              )
            })}
          </SortableContext>
        </DndContext>
      </PopoverContent>
    </Popover>
  )
}

function sortByOrders<TData>(
  array: Column<TData, unknown>[],
  orders: string[] = []
) {
  const orderedColumns = [...array]
  orderedColumns.sort((a, b) => orders.indexOf(a.id) - orders.indexOf(b.id))
  return orderedColumns
}

function SortItem({
  children,
  id,
  checked = false,
  onChange,
  disabled = false,
}: {
  children: React.ReactNode
  id: UniqueIdentifier
  checked?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <Label
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("group flex items-center gap-2", "p-2", "hover:bg-muted")}
    >
      <Checkbox
        disabled={disabled}
        checked={checked}
        onCheckedChange={(value) => {
          onChange?.(!!value)
        }}
      />
      <GripVerticalIcon
        {...listeners}
        className="h-4 w-4 text-muted-foreground flex-shrink-0 group-hover:text-primary hover:cursor-grab"
      />
      <span className="w-full line-clamp-2">{children}</span>
    </Label>
  )
}
