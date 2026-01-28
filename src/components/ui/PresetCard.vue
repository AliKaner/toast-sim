<script setup lang="ts">
import type { Preset } from '../../types/notification'
import Button from './Button.vue'

defineProps<{
  preset: Preset
}>()

defineEmits<{
  load: [preset: Preset]
  delete: [preset: Preset]
}>()

const typeColors: Record<string, string> = {
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
}

function formatDuration(ms: number): string {
  if (ms === 0) return 'Persistent'
  return `${ms / 1000}s`
}

function formatPosition(position: string): string {
  return position.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}
</script>

<template>
  <div class="preset-card">
    <div class="preset-info">
      <div 
        class="type-indicator" 
        :style="{ backgroundColor: typeColors[preset.config.type] }"
      ></div>
      <div class="preset-details">
        <span class="preset-name">{{ preset.name }}</span>
        <span class="preset-meta">
          {{ formatDuration(preset.config.duration) }} • {{ formatPosition(preset.config.position) }}
        </span>
      </div>
    </div>
    <div class="preset-actions">
      <Button 
        text="Load" 
        @click="$emit('load', preset)"
      />
      <Button 
        text="Delete" 
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
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
}

.preset-card:last-child {
  border-bottom: none;
}

.preset-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.type-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.preset-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.preset-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.preset-meta {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.preset-actions {
  display: flex;
  gap: 8px;
}
</style>
