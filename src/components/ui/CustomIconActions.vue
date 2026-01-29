<script setup lang="ts">

interface Props {
  hasCustomIcon: boolean;
  testId?: string;
  tabindex?: number | string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'auto-fill'): void;
  (e: 'clear'): void;
  (e: 'upload', content: string): void;
  (e: 'error', message: string): void;
}>();

const onFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  const MAX_SIZE = 1 * 1024 * 1024;

  if (file) {
    if (file.size > MAX_SIZE) {
      emit('error', 'SVG file size exceeds the 1MB limit.');
      target.value = '';
      return;
    }

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          emit('upload', result);
        }
      };
      reader.onerror = () => {
        emit('error', 'Failed to read file.');
      };
      reader.readAsText(file);
    } else {
       emit('error', 'Please upload a valid SVG file.');
    }
  }
  target.value = '';
};
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
        ❤️ Auto Fill
      </button>
      <button 
        v-else 
        class="action-btn clear-icon-btn" 
        @click="emit('clear')"
        type="button"
        :tabindex="tabindex"
      >
        Clear
      </button>
      
      <div class="file-upload-container">
        <label class="file-upload-label">
          Or upload SVG file
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
  color: var(--color-error);
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: none;
  padding: 0;
}

.clear-icon-btn {
  opacity: 0.7;
}

.clear-icon-btn:hover {
  opacity: 1;
  text-decoration: underline;
}

.action-btn:hover {
  color: var(--color-primary);
  opacity: 0.8;
}

.file-upload-container {
  display: flex;
  align-items: center;
}

.file-upload-label {
  display: inline-block;
  font-size: 0.75rem;
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: underline;
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
