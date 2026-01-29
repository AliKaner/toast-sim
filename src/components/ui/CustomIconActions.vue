<script setup lang="ts">
interface Props {
  hasCustomIcon: boolean
  testId?: string
  tabindex?: number | string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'auto-fill'): void
  (e: 'clear'): void
  (e: 'upload', content: string): void
  (e: 'error', message: string): void
}>()

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const onFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  const MAX_SIZE = 1 * 1024 * 1024

  if (file) {
    if (file.size > MAX_SIZE) {
      emit('error', t('form.custom_icon_actions.errors.file_size'))
      target.value = ''
      return
    }

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          emit('upload', result)
        }
      }
      reader.onerror = () => {
        emit('error', t('form.custom_icon_actions.errors.read_fail'))
      }
      reader.readAsText(file)
    } else {
      emit('error', t('form.custom_icon_actions.errors.invalid_file'))
    }
  }
  target.value = ''
}
</script>

<template>
  <div class="custom-icon-actions" :data-testid="testId">
    <div class="right-actions">
      <button
        v-if="!hasCustomIcon"
        class="action-btn"
        @click="emit('auto-fill')"
        type="button"
        :tabindex="tabindex"
      >
        {{ t('form.custom_icon_actions.auto_fill') }}
      </button>
      <button
        v-else
        class="action-btn clear-icon-btn"
        @click="emit('clear')"
        type="button"
        :tabindex="tabindex"
      >
        {{ t('form.clear') }}
      </button>

      <div class="file-upload-container">
        <label class="file-upload-label">
          {{ t('form.custom_icon_actions.upload_svg') }}
          <input
            ref="fileInput"
            type="file"
            accept=".svg"
            @change="onFileUpload"
            class="file-input"
            :tabindex="tabindex"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-icon-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.5rem;
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-btn {
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  opacity: 0.8;
  display: flex;
  align-items: center;
}

.clear-icon-btn {
  color: var(--color-error);
  text-decoration: none;
  opacity: 0.9;
}

.clear-icon-btn:hover {
  opacity: 1;
  text-decoration: underline;
}

.action-btn:hover {
  opacity: 1;
}

.file-upload-container {
  display: flex;
  align-items: center;
}

.file-upload-label {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  color: var(--color-text);
  cursor: pointer;
  text-decoration: underline;
  opacity: 0.8;
}

.file-upload-label:hover {
  opacity: 1;
}

.file-input {
  position: absolute;
  width: 0.0625rem;
  height: 0.0625rem;
  padding: 0;
  margin: -0.0625rem;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
