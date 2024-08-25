import { Button, Checkbox } from "@/components/ui"
import { cn } from "@/lib"
import { EllipsisIcon, Loader2 } from "lucide-react"
import { InlineStack } from "../inline-stack"
import { Show } from "../show"
import { Text } from "../text"
import type {
  DestructableAction,
  IconableAction,
  LoadableAction,
  PinnableAction,
} from "../types"
import type { IndexTableProps } from "./index-table"

export interface BulkActionItem
  extends LoadableAction,
    DestructableAction,
    IconableAction,
    PinnableAction {}

interface BulkActionsPorps<TData, TValue>
  extends Pick<
    IndexTableProps<TData, TValue>,
    "stickyBulkActions" | "table" | "bulkActions"
  > {
  selectedCount?: number
}

export function BulkActions<TData, TValue>({
  table,
  stickyBulkActions = true,
  selectedCount,
  bulkActions,
}: BulkActionsPorps<TData, TValue>) {
  const pinnedBulkActions: BulkActionItem[] = []
  const foldBulkActions: BulkActionItem[] = []

  if (Array.isArray(bulkActions)) {
    bulkActions.forEach((aciton) => {
      if (aciton.pinned) {
        pinnedBulkActions.push(aciton)
      } else {
        foldBulkActions.push(aciton)
      }
    })
  }

  return (
    <div
      className={cn(
        "h-10 pl-4 pr-2 -mb-10 bg-background shadow",
        "border-y -mt-[1px]",
        "flex gap-2 items-center justify-between",
        stickyBulkActions && "sticky top-14 z-30"
      )}
    >
      <InlineStack blockAlign="baseline" gap="lg">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            if (!value) {
              table.toggleAllRowsSelected(value)
            }
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
        <Text variant="bodySm">
          {selectedCount} {"selected"}
        </Text>
      </InlineStack>

      <InlineStack gap="md">
        <PinnedActions actions={pinnedBulkActions} />

        <Button
          variant={"outline"}
          size={"sm"}
          className="px-4 h-8 shadow rounded-xl bg-card"
        >
          <EllipsisIcon className="w-4 h-4" />
        </Button>
      </InlineStack>
    </div>
  )
}

function PinnedActions({ actions }: { actions: BulkActionItem[] }) {
  return actions.map((action, idx) => {
    return (
      <Button
        key={idx}
        variant={action.destructive ? "destructive-outline" : "outline"}
        size={"sm"}
        disabled={action.loading}
        className={cn(
          "px-4 shadow rounded-xl bg-card flex gap-2 flex-nowrap",
          action.loading && "pl-3"
        )}
      >
        <Show when={action.loading}>
          <Loader2 className="w-4 h-4 animate-spin" />
        </Show>
        {action.content}
      </Button>
    )
  })
}

function FoldActions({ actions }: { actions: BulkActionItem[] }) {
  return
}
