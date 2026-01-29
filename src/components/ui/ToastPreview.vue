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
      <Toast
        :notification="previewNotification"
        @close="() => {}"
      />
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
  gap: 16px;
}

.toast-preview-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.toast-preview-container {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 40px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.toast-preview-container::-webkit-scrollbar {
  width: 6px;
}

.toast-preview-container::-webkit-scrollbar-track {
  background: transparent;
}

.toast-preview-container::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 4px;
}

.toast-preview-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-secondary);
}

.toast-preview-actions {
  width: 100%;
}
</style>
