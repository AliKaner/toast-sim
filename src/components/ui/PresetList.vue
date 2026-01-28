<script setup lang="ts">
import type { Preset } from '../../types/notification'
import PresetCard from './PresetCard.vue'

defineProps<{
  presets: Preset[]
}>()

defineEmits<{
  load: [preset: Preset]
  delete: [preset: Preset]
}>()
</script>

<template>
  <div class="preset-list">
    <PresetCard
      v-for="preset in presets"
      :key="preset.id"
      :preset="preset"
      @load="$emit('load', $event)"
      @delete="$emit('delete', $event)"
    />
    <div v-if="presets.length === 0" class="empty-state">
      Henüz preset bulunmuyor
    </div>
  </div>
</template>

<style scoped>
.preset-list {
  background: var(--color-surface);
  border-radius: 8px;
  overflow: hidden;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 14px;
}
</style>
