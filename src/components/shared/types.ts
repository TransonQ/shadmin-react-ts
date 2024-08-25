export interface BaseAction {
  id?: string
  content?: string
  onAction?(): void
}

export interface DisableableAction extends BaseAction {
  disabled?: boolean
}

export interface HiddableAction extends BaseAction {
  hidden?: boolean
}

export interface DestructableAction extends BaseAction {
  destructive?: boolean
}

export interface LoadableAction extends BaseAction {
  loading?: boolean
}

export interface IconableAction extends BaseAction {
  icon?: React.ReactNode
}

export interface PinnableAction extends BaseAction {
  pinned?: boolean
}
