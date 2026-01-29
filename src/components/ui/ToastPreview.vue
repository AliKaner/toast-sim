<script setup lang="ts">
import { computed } from 'vue'
import Toast from './Toast.vue'
import Button from './Button.vue'
import type { NotificationConfig, ActiveNotification } from '../../types/notification'

interface ToastPreviewProps {
  config: NotificationConfig
}

const props = defineProps<ToastPreviewProps>()

const emit = defineEmits<{
  (e: 'showNotification'): void
}>()

const previewNotification = computed<ActiveNotification>(() => ({
  ...props.config,
  createdAt: Date.now()
}))

function handleShowNotification() {
  emit('showNotification')
}
</script>

<template>
  <div class="toast-preview">
    <div class="toast-preview-label">Preview</div>
    <div class="toast-preview-container">
      <Toast :notification="previewNotification" @close="() => {}" />
    </div>
    <div class="toast-preview-actions">
      <Button
        id="show-notification-btn"
        name="showNotificationButton"
        text="Show Notification"
        @click="handleShowNotification"
      />
    </div>
  </div>
</template>

<style scoped>
.toast-preview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toast-preview-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.toast-preview-container {
  background: var(--color-surface);
  border-radius: 0.75rem;
  padding: 2.5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 11.25rem;
  max-height: 18.75rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.toast-preview-container::-webkit-scrollbar {
  width: 0.375rem;
}

.toast-preview-container::-webkit-scrollbar-track {
  background: transparent;
}

.toast-preview-container::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 0.25rem;
}

.toast-preview-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-secondary);
}

.toast-preview-actions {
  width: 100%;
}
</style>
