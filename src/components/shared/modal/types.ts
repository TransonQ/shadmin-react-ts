import type {
  BaseAction,
  DestructableAction,
  DisableableAction,
  LoadableAction,
} from "../types"

interface PrimaryAction
  extends LoadableAction,
    DisableableAction,
    LoadableAction,
    DestructableAction {}

interface SecondaryAction extends BaseAction {}

export interface ModalProps {
  children?: React.ReactNode
  title?: string
  open?: boolean
  onClose?: (open?: boolean) => void
  primaryAction?: PrimaryAction | React.ReactNode
  secondaryAction?: SecondaryAction | React.ReactNode
}
