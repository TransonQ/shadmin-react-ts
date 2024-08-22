import { cn } from "@/lib";
import type { LucideIcon } from "lucide-react";
import { TriangleAlertIcon } from "lucide-react";
import { createPortal } from "react-dom";
import type { PageWidth } from "../lib";
import { calcPageWidth, isInterface } from "../lib";
import { Button } from "../ui";
import { frameVariants } from "./config";
import { Icon } from "./icon";
import { Logo } from "./logo";
import { type BaseAction, type DisableableAction } from "./types";

const { headerHeight } = frameVariants

interface SaveAction extends DisableableAction {}
interface DiscardAction extends BaseAction {}

type ContextualSaveBarProps = {
  logo?: React.ReactNode
  pageWidth?: PageWidth
  message?: React.ReactNode
  messageSuffixIcon?: LucideIcon
  saveAction?: SaveAction | React.ReactNode
  discardAction?: DiscardAction | React.ReactNode
}

export const ContextualSaveBar = ({
  logo,
  pageWidth = "defaultWidth",
  message,
  messageSuffixIcon,
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
      {logo || <Logo />}
      <div className="w-full h-full px-4 flex-1">
        <div
          className={cn(
            "mx-auto h-full flex items-center justify-between",
            calcPageWidth(pageWidth)
          )}
        >
          <div className="flex items-center gap-2">
            <Icon source={messageSuffixIcon || TriangleAlertIcon} />
            {message}
          </div>
          <div className="flex items-center gap-2">
            {discardActionMarkup}
            {saveActionMarkup}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(Markup, document.body)
}
