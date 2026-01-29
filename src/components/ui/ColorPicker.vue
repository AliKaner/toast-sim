<script setup lang="ts">
import { computed } from 'vue'
import FormItemWrapper from './FormItemWrapper.vue'

const model = defineModel<string>({ default: '#ffffff' })

interface ColorPickerProps {
  label?: string
  required?: boolean
  error?: string
  hint?: string
  name?: string
  id?: string
  testId?: string
  tabindex?: number | string
}

defineProps<ColorPickerProps>()

const hexWithoutHash = computed(() => {
  return model.value.replace('#', '').replace(/[^0-9A-Fa-f]/g, '')
})

const displayColor = computed(() => {
  const hex = hexWithoutHash.value
  if (hex.length === 6) {
    return `#${hex}`
  }
  return '#ffffff'
})

function onInput(event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6)
  model.value = `#${value}`
}
</script>

<template>
  <FormItemWrapper 
    :label="label" 
    :required="required" 
    :error="error" 
    :hint="hint"
    no-focus-color
    :for="id"
  >
    <div class="color-picker">
      <div class="color-preview" :style="{ backgroundColor: displayColor }"></div>
      <div class="input-wrapper">
        <span class="hash">#</span>
        <input
          type="text"
          :id="id"
          :name="name"
          class="color-input"
          :value="hexWithoutHash"
          @input="onInput"
          maxlength="6"
          placeholder="000000"
          :data-testid="testId"
          :tabindex="tabindex"
        />
      </div>
    </div>
  </FormItemWrapper>
</template>

<style scoped>
.color-picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.color-preview {
  width: 2.125rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid var(--color-border);
  flex-shrink: 0;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 0;
  flex: 1;
  background: var(--color-surface);
  border: 0.0625rem solid var(--color-border);
  border-radius: 0.5rem;
  padding: 0 0.75rem;
  height: 2.5rem;
  transition: border-color 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.1875rem var(--color-primary-soft);
}

.hash {
  color: var(--color-text);
  font-family: monospace;
  font-size: 0.875rem;
  user-select: none;
}

.color-input {
  border: none;
  background: transparent;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--color-text);
  width: 100%;
  outline: none;
  padding: 0;
  height: 100%;
}

.color-input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.5;
}
</style>
