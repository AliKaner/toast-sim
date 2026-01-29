<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from './Card.vue'
import Button from './Button.vue'
import Input from './Input.vue'
import Toast from './Toast.vue'
import PresetCard from './PresetCard.vue'
import CodeExport from './CodeExport.vue'
import PresetFilters from './PresetFilters.vue'
import PresetSortToggle from './PresetSortToggle.vue'
import type { ActiveNotification, Preset, FormState, NotificationType } from '../../types/notification'
import { usePresetStore } from '../../composables/usePresetStore'

interface Props {
  previewNotification: ActiveNotification
  highlightedCode: string
  form: FormState
}

interface Emits {
  (e: 'show-notification'): void
  (e: 'save-preset'): void
  (e: 'load-preset', preset: Preset): void
  (e: 'delete-preset', preset: Preset): void
  (e: 'copy-code'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const presetStore = usePresetStore()

const filterType = ref<NotificationType | 'all' | 'custom'>('all')
const isDescending = ref(true)

const filteredPresets = computed(() => {
  let result = [...presetStore.presets]
  

  if (filterType.value !== 'all') {
    if (filterType.value === 'custom') {
      result = result.filter(p => !!p.config.customIcon)
    } else {
      result = result.filter(p => p.config.type === filterType.value && !p.config.customIcon)
    }
  }
  

  if (isDescending.value) {
    result.reverse()
  }
  
  return result
})
</script>

<template>
  <div class="toast-preview-card">
    <Card label="Preview">
      <div class="preview-container">
        <Toast
          :notification="previewNotification"
          @close="() => {}"
        />
      </div>
      <Button
        id="show-notification-btn"
        name="showNotification"
        text="Show Notification"
        @click="emit('show-notification')"
      />
    </Card>

    <Card label="Saved Presets">
      <template #header>
        <div class="preset-header-actions">
          <PresetFilters v-model="filterType" />
          <div class="header-divider"></div>
          <PresetSortToggle v-model:is-descending="isDescending" />
        </div>
      </template>
      <div class="presets-list">
        <PresetCard
          v-for="preset in filteredPresets"
          :key="preset.id"
          :preset="preset"
          @load="emit('load-preset', $event)"
          @delete="emit('delete-preset', $event)"
        />
        <div v-if="filteredPresets.length === 0" class="empty-presets">
          {{ filterType === 'all' ? 'No presets saved yet' : 'No presets found for this filter' }}
        </div>
      </div>
      <div class="preset-save">
        <Input 
          v-model="form.presetName" 
          placeholder="Preset name..." 
        />
        <div class="save-btn">
          <Button
            id="save-preset-btn"
            name="savePreset"
            text="Save"
            :disabled="!form.presetName.trim()"
            @click="emit('save-preset')"
          />
        </div>
      </div>
    </Card>

    <Card label="Code Export" class="code-export-card">
      <CodeExport 
        :highlighted-code="highlightedCode" 
        @copy="emit('copy-code')" 
      />
    </Card>
  </div>
</template>

<style scoped>
.toast-preview-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  background: var(--color-surface);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
}

.preview-container {
  background: var(--color-preview-bg);
  border-radius: 0.75rem;
  padding: 2.5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
  min-height: 18.75rem;

}

.preset-header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-divider {
  width: 0.0625rem;
  height: 1rem;
  background: var(--color-border);
}

.presets-list {
  border-radius: 0.5rem;
  overflow: hidden;
  height: 13.125rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.25rem;
}

.presets-list::-webkit-scrollbar {
  width: 0.25rem;
}

.presets-list::-webkit-scrollbar-track {
  background: transparent;
}

.presets-list::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 0.25rem;
}

.presets-list::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-secondary);
}

.empty-presets {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.preset-save {
  display: flex;
  gap: 0.75rem;
}

.preset-save :deep(.base-input) {
  flex: 1;
}

.preset-save .save-btn {
  width: 5rem;
  flex-shrink: 0;
}

.code-export-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.code-export-card :deep(.card-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
