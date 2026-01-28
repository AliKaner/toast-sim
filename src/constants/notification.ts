import type { NotificationType, Position, AnimationType } from '../types/notification'

export const TYPE_OPTIONS = [
  { text: 'Success', icon: '✓', value: 'success' as const },
  { text: 'Error', icon: '✕', value: 'error' as const },
  { text: 'Warning', icon: '⚠', value: 'warning' as const },
  { text: 'Info', icon: 'ⓘ', value: 'info' as const }
]

export const POSITION_OPTIONS = [
  { text: 'TL', value: 'top-left' as const },
  { text: 'TC', value: 'top-center' as const },
  { text: 'TR', value: 'top-right' as const },
  { text: 'BL', value: 'bottom-left' as const },
  { text: 'BC', value: 'bottom-center' as const },
  { text: 'BR', value: 'bottom-right' as const }
]

export const ANIMATION_OPTIONS = [
  { text: 'Fade', value: 'fade' as const },
  { text: 'Slide', value: 'slide' as const },
  { text: 'Bounce', value: 'bounce' as const }
]

export const TYPE_DEFAULTS: Record<NotificationType, { bg: string; text: string }> = {
  success: { bg: '#5bca4d', text: '#FFFFFF' },
  error: { bg: '#d84947', text: '#FFFFFF' },
  warning: { bg: '#e3a600', text: '#FFFFFF' },
  info: { bg: '#666efd', text: '#FFFFFF' }
}

export const TYPE_TITLES: Record<NotificationType, string> = {
  success: 'Success!',
  error: 'Error!',
  warning: 'Warning!',
  info: 'Info'
}

export const DEFAULT_CONFIG = {
  type: 'success' as NotificationType,
  title: 'Success!',
  message: 'Your changes have been saved successfully.',
  duration: 3,
  position: 'top-right' as Position,
  backgroundColor: '#5bca4d',
  textColor: '#FFFFFF',
  showIcon: true,
  showCloseButton: true,
  animation: 'slide' as AnimationType
}
