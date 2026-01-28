<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel<string>({ default: '' })

const displayColor = computed(() => {
  const hex = model.value.replace(/[^0-9A-Fa-f]/g, '')
  if (hex.length === 6) {
    return `#${hex}`
  }
  return '#ffffff'
})

function onInput(event: Event) {
  const input = event.target as HTMLInputElement
  // Sadece hex karakterleri kabul et (0-9, A-F, a-f)
  const value = input.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6)
  model.value = value
}
</script>

<template>
  <div class="color-picker">
    <div class="color-preview" :style="{ backgroundColor: displayColor }"></div>
    <span class="hash">#</span>
    <input
      type="text"
      class="color-input"
      :value="model"
      @input="onInput"
      maxlength="6"
      placeholder="000000"
    />
  </div>
</template>

<style scoped>
.color-picker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 8px 12px;
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.hash {
  color: var(--color-text-secondary);
  font-family: monospace;
  font-size: 14px;
}

.color-input {
  border: none;
  background: transparent;
  font-family: monospace;
  font-size: 14px;
  color: var(--color-text);
  width: 70px;
  outline: none;
}

.color-input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.5;
}
</style>
