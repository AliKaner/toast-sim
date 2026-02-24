import type { NotificationType, Position, AnimationType } from '../types/notification'

export const MS_PER_SECOND = 1000

export const TYPE_OPTIONS = [
  { text: 'types.success', icon: '✓', value: 'success' as const },
  { text: 'types.error', icon: '✕', value: 'error' as const },
  { text: 'types.warning', icon: '⚠', value: 'warning' as const },
  { text: 'types.info', icon: 'ⓘ', value: 'info' as const }
]

export const POSITION_OPTIONS = [
  { text: 'positions.tl', value: 'top-left' as const },
  { text: 'positions.tc', value: 'top-center' as const },
  { text: 'positions.tr', value: 'top-right' as const },
  { text: 'positions.bl', value: 'bottom-left' as const },
  { text: 'positions.bc', value: 'bottom-center' as const },
  { text: 'positions.br', value: 'bottom-right' as const }
]

export const ANIMATION_OPTIONS = [
  { text: 'animations.fade', value: 'fade' as const },
  { text: 'animations.slide', value: 'slide' as const },
  { text: 'animations.bounce', value: 'bounce' as const }
]

export const TYPE_DEFAULTS: Record<NotificationType, { bg: string; text: string }> = {
  success: { bg: '#5bca4d', text: '#FFFFFF' },
  error: { bg: '#d84947', text: '#FFFFFF' },
  warning: { bg: '#e3a600', text: '#FFFFFF' },
  info: { bg: '#666efd', text: '#FFFFFF' }
}

export const TYPE_TITLES: Record<NotificationType, string> = {
  success: 'defaults.success_title',
  error: 'defaults.error_title',
  warning: 'defaults.warning_title',
  info: 'defaults.info_title'
}

export const DEFAULT_CONFIG = {
  type: 'success' as NotificationType,
  title: 'defaults.success_title',
  message: 'defaults.message',
  duration: 3,
  position: 'top-right' as Position,
  backgroundColor: '#5bca4d',
  textColor: '#FFFFFF',
  showIcon: true,
  showCloseButton: true,
  animation: 'slide' as AnimationType,
  presetName: '',
  customIcon: '',
  isPersistent: false,
}
