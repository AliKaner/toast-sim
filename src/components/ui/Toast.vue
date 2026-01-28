<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { ActiveNotification } from '../../types/notification'

interface ToastProps {
  notification: ActiveNotification
}

const props = defineProps<ToastProps>()

const emit = defineEmits<{
  (e: 'close', id: string): void
}>()

const progress = ref(100)
let progressInterval: ReturnType<typeof setInterval> | null = null

const isPersistent = computed(() => props.notification.duration === 0)

const typeIcon = computed(() => {
  // If custom icon exists and showIcon is true, use custom icon
  if (props.notification.customIcon && props.notification.showIcon) {
    return props.notification.customIcon
  }
  
  // Otherwise use type-based icons
  const icons: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ⓘ'
  }
  return icons[props.notification.type] || 'ⓘ'
})

const containerStyle = computed(() => ({
  backgroundColor: props.notification.backgroundColor,
  color: props.notification.textColor
}))

const progressStyle = computed(() => ({
  width: `${progress.value}%`,
  backgroundColor: `${props.notification.textColor}40`
}))

function handleClose() {
  emit('close', props.notification.id)
}

function startProgressBar() {
  if (isPersistent.value) return

  const duration = props.notification.duration
  const intervalTime = 10 // Update every 10ms for smooth animation
  const decrement = (100 / duration) * intervalTime

  progressInterval = setInterval(() => {
    progress.value -= decrement
    if (progress.value <= 0) {
      progress.value = 0
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, intervalTime)
}

onMounted(() => {
  startProgressBar()
})

onBeforeUnmount(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<template>
  <div class="toast" :style="containerStyle">
    <div class="toast-content">
      <span v-if="notification.showIcon" class="toast-icon">{{ typeIcon }}</span>
      <div class="toast-text">
        <strong class="toast-title">{{ notification.title }}</strong>
        <p class="toast-message">{{ notification.message }}</p>
      </div>
      <button
        v-if="notification.showCloseButton"
        class="toast-close"
        @click="handleClose"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
    
    <!-- Progress bar - only show if not persistent -->
    <div v-if="!isPersistent" class="toast-progress-container">
      <div class="toast-progress" :style="progressStyle"></div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  position: relative;
  min-width: 280px;
  max-width: 380px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: toast-slide-in 0.3s ease-out;
}

@keyframes toast-slide-in {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
}

.toast-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-text {
  flex: 1;
  min-width: 0;
}

.toast-title {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  opacity: 1;
}

.toast-progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
}

.toast-progress {
  height: 100%;
  transition: width 0.01s linear;
}
</style>
