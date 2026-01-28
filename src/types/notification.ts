export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type AnimationType = 'fade' | 'slide' | 'bounce'

export interface NotificationConfig {
  id: string
  type: NotificationType
  title: string
  message: string
  duration: number
  position: Position
  backgroundColor: string
  textColor: string
  showIcon: boolean
  showCloseButton: boolean
  animation: AnimationType
  customIcon?: string
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

export interface FormState {
  type: NotificationType
  title: string
  message: string
  duration: number
  isPersistent: boolean
  position: Position
  backgroundColor: string
  textColor: string
  showIcon: boolean
  showCloseButton: boolean
  animation: AnimationType
  customIcon?: string
  presetName: string
}
