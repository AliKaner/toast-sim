export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export interface NotificationConfig {
  id: string
  type: NotificationType
  title: string
  message: string
  duration: number // in milliseconds, 0 = persistent
  position: Position
  backgroundColor: string
  textColor: string
  showIcon: boolean
  showCloseButton: boolean
}

export interface Preset {
  id: string
  name: string
  config: Omit<NotificationConfig, 'id'>
  createdAt: string
}

export interface ActiveNotification extends NotificationConfig {
  createdAt: number
}
