import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NotificationConfig, ActiveNotification, Position } from '../types/notification'

export const useToastStore = defineStore('toast', () => {
  const notifications = ref<ActiveNotification[]>([])

  const notificationsByPosition = computed(() => {
    const grouped: Record<Position, ActiveNotification[]> = {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': []
    }

    notifications.value.forEach((notification) => {
      grouped[notification.position].push(notification)
    })

    return grouped
  })

  function addNotification(config: NotificationConfig) {
    const activeNotification: ActiveNotification = {
      ...config,
      createdAt: Date.now()
    }

    notifications.value.push(activeNotification)

    if (config.duration > 0) {
      setTimeout(() => {
        removeNotification(config.id)
      }, config.duration)
    }

    return activeNotification
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  //could be used later
  function clearAll() {
    notifications.value = []
  }

  function clearByPosition(position: Position) {
    notifications.value = notifications.value.filter((n) => n.position !== position)
  }

  return {
    notifications,
    notificationsByPosition,
    addNotification,
    removeNotification,
    clearAll,
    clearByPosition
  }
})
