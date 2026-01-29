<script setup lang="ts">
import type { NotificationType } from '../../types/notification'
import { TYPE_DEFAULTS } from '../../constants/notification'

interface Props {
  modelValue: NotificationType | 'all' | 'custom'
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: NotificationType | 'all' | 'custom'): void
}>()

const CUSTOM_COLOR = '#ec4899'

const filters = [
  { value: 'all', color: 'var(--color-text-muted)', label: 'All' },
  { value: 'success', color: TYPE_DEFAULTS.success.bg, label: 'Success' },
  { value: 'error', color: TYPE_DEFAULTS.error.bg, label: 'Error' },
  { value: 'warning', color: TYPE_DEFAULTS.warning.bg, label: 'Warning' },
  { value: 'info', color: TYPE_DEFAULTS.info.bg, label: 'Info' },
  { value: 'custom', color: CUSTOM_COLOR, label: 'Custom' }
]
</script>

<template>
  <div class="preset-filters">
    <button
      v-for="filter in filters"
      :key="filter.value"
      class="filter-dot"
      :class="{ active: modelValue === filter.value }"
      :style="{ backgroundColor: filter.color }"
      @click="emit('update:modelValue', filter.value as any)"
      :title="filter.label"
    >
      <span v-if="modelValue === filter.value" class="active-indicator"></span>
    </button>
  </div>
</template>

<style scoped>
.preset-filters {
  display: flex;
  gap: 0.375rem;
  align-items: center;
}

.filter-dot {
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  border: 0.0625rem solid var(--color-border-light, rgba(255, 255, 255, 0.1));
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease, border-color 0.2s ease;
  padding: 0;
}

.filter-dot:hover {
  transform: scale(1.2);
  border-color: var(--color-border-hover, rgba(255, 255, 255, 0.3));
}

.filter-dot.active {
  transform: scale(1.1);
  border-color: var(--color-button-text, #fff);
}

.active-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.25rem;
  height: 0.25rem;
  background: var(--color-button-text, #fff);
  border-radius: 50%;
  pointer-events: none;
}
</style>
