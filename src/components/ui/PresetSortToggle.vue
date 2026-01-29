<script setup lang="ts">
interface Props {
  isDescending: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:isDescending', value: boolean): void
}>()

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <button
    class="sort-toggle"
    @click="emit('update:isDescending', !isDescending)"
    :title="isDescending ? 'Newest First' : 'Oldest First'"
  >
    <span class="sort-icon" :class="{ 'is-desc': isDescending }"> ↓ </span>
    {{ t('preview.sort') }}
  </button>
</template>

<style scoped>
.sort-toggle {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.sort-toggle:hover {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.sort-icon {
  display: inline-block;
  transition: transform 0.3s ease;
  font-size: 0.875rem;
}

.sort-icon.is-desc {
  transform: rotate(180deg);
}
</style>
