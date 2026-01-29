<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import NotificationIcon from './NotificationIcon.vue'
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
  const intervalTime = 10
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
      <div v-if="notification.showIcon" class="toast-icon">
        <NotificationIcon 
          :type="notification.type" 
          :custom-icon="notification.customIcon" 
        />
      </div>
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
    
    <div v-if="!isPersistent" class="toast-progress-container">
      <div class="toast-progress" :style="progressStyle"></div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  position: relative;
  min-width: 17.5rem;
  max-width: 23.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 1.25rem var(--color-shadow, rgba(0, 0, 0, 0.25));
  overflow: hidden;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
}

.toast-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.toast-text {
  flex: 1;
  min-width: 0;
}

.toast-title {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  word-break: break-all;
}

.toast-message {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
  word-break: break-all;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
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
  height: 0.25rem;
  background-color: var(--color-progress-track, rgba(0, 0, 0, 0.1));
}

.toast-progress {
  height: 100%;
  transition: width 0.01s linear;
}
</style>
