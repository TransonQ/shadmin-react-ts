import { cn } from "@/lib"
import { createPortal } from "react-dom"
import { calcPageWidth, isInterface, PageWidth } from "../calc"
import { Button } from "../ui"
import { frameVariants } from "./config"
import { type BaseAction, type DisableableAction } from "./types"
const { headerHeight, navbarWidth } = frameVariants

interface SaveAction extends DisableableAction {}
interface DiscardAction extends BaseAction {}

type ContextualSaveBarProps = {
  pageWidth?: PageWidth
  message?: React.ReactNode
  saveAction?: SaveAction | React.ReactNode
  discardAction?: DiscardAction | React.ReactNode
}

export const ContextualSaveBar = ({
  pageWidth = "defaultWidth",
  message,
  saveAction,
  discardAction,
}: ContextualSaveBarProps) => {
  const discardActionMarkup = isInterface(discardAction) ? (
    <Button
      variant="ghost"
      className="hover:bg-background/90"
      onClick={discardAction.onAction}
    >
      {discardAction.content}
    </Button>
  ) : (
    discardAction
  )

  const saveActionMarkup = isInterface(saveAction) ? (
    <Button
      variant="secondary"
      className="text-foreground"
      onClick={saveAction.onAction}
    >
      {saveAction.content}
    </Button>
  ) : (
    saveAction
  )

  const Markup = (
    <div
      x-chunk="CONTEXTUAL_SAVE_BAR"
      style={{ height: headerHeight }}
      className={cn(
        "fixed z-[60] top-0 left-0 right-0",
        "bg-zinc-950 text-white",
        "flex",
        "animate-in animate-out"
      )}
    >
      <div
        style={{ height: headerHeight - 1, width: navbarWidth }}
        className="flex-shrink-0"
      >
        <span className="sr-only">{"LOGO"}</span>
      </div>
      <div
        className={cn(
          "mx-auto flex-1 flex items-center justify-between",
          calcPageWidth(pageWidth)
        )}
      >
        <div className="">{message}</div>
        <div className="flex items-center gap-2">
          {discardActionMarkup}
          {saveActionMarkup}
        </div>
      </div>
    </div>
  )

  return createPortal(Markup, document.body)
}
