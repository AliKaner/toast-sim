<script setup lang="ts">
import type { Preset } from '../../types/notification'
import { TYPE_DEFAULTS } from '../../constants/notification'
import { formatDuration, formatPosition } from '../../utils/format'
import Button from './Button.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface PresetCardProps {
  preset: Preset
}

defineProps<PresetCardProps>()

defineEmits<{
  load: [preset: Preset]
  delete: [preset: Preset]
}>()

const CUSTOM_COLOR = '#ec4899'
</script>

<template>
  <div class="preset-card">
    <div class="preset-info">
      <div
        class="type-indicator"
        :style="{
          backgroundColor: preset.config.customIcon
            ? CUSTOM_COLOR
            : TYPE_DEFAULTS[preset.config.type].bg
        }"
      ></div>
      <div class="preset-details">
        <span class="preset-name">{{ preset.name }}</span>
        <div class="preset-meta">
          <span>{{ formatDuration(preset.config.duration) }}</span>
          <span class="meta-separator">{{ formatPosition(preset.config.position) }}</span>
        </div>
      </div>
    </div>
    <div class="preset-actions">
      <Button
        :text="t('preset_actions.load')"
        variant="outline"
        size="small"
        @click="$emit('load', preset)"
      />
      <Button
        :text="t('preset_actions.delete')"
        variant="outline"
        size="small"
        @click="$emit('delete', preset)"
      />
    </div>
  </div>
</template>

<style scoped>
.preset-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background: var(--color-surface-hover);
}

.preset-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.type-indicator {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.preset-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
  min-width: 0;
}

.preset-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preset-meta {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.meta-separator::before {
  content: '';
  display: inline-block;
  width: 0.1875rem;
  height: 0.1875rem;
  background-color: currentColor;
  border-radius: 50%;
  margin: 0 0.375rem;
  vertical-align: middle;
}

.preset-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
