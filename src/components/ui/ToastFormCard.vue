<script setup lang="ts">
import { computed, watch } from 'vue'
import Card from './Card.vue'
import Input from './Input.vue'
import TextArea from './TextArea.vue'
import Segment from './Segment.vue'
import DurationSlider from './DurationSlider.vue'
import ColorPicker from './ColorPicker.vue'
import Checkbox from './Checkbox.vue'
import NotificationTypeSelector from './NotificationTypeSelector.vue'
import type { FormState } from '../../types/notification'
import { useToastStore } from '../../composables/useToastStore'
import { nanoid } from 'nanoid'
import { POSITION_OPTIONS, ANIMATION_OPTIONS, DEFAULT_CONFIG } from '../../constants/notification'

interface Props {
  form: FormState
}

const props = defineProps<Props>()
const toastStore = useToastStore()

const isFormDirty = computed(() => {
  return props.form.title !== DEFAULT_CONFIG.title ||
         props.form.message !== DEFAULT_CONFIG.message ||
         props.form.customIcon !== '' ||
         props.form.presetName !== '' ||
         props.form.backgroundColor !== DEFAULT_CONFIG.backgroundColor ||
         props.form.type !== DEFAULT_CONFIG.type
})

const clearForm = () => {
  Object.assign(props.form, {
    ...DEFAULT_CONFIG,
    isPersistent: false,
    presetName: '',
    customIcon: ''
  })
}

const HEART_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`

const autoFillHeart = () => {
  props.form.customIcon = HEART_SVG
}

const clearCustomIcon = () => {
  props.form.customIcon = ''
}

watch(() => props.form.showCloseButton, (newVal) => {
  if (!newVal && props.form.isPersistent) {
    props.form.isPersistent = false
  }
})

const onFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  const MAX_SIZE = 1 * 1024 * 1024

  if (file) {
    if (file.size > MAX_SIZE) {
      toastStore.addNotification({
        id: nanoid(),
        type: 'error',
        title: 'File too large',
        message: 'SVG file size exceeds the 1MB limit.',
        duration: 3000,
        position: 'top-right',
        backgroundColor: 'var(--color-error)',
        textColor: 'var(--color-button-text, #fff)',
        showIcon: true,
        showCloseButton: true,
        animation: 'slide'
      })

      target.value = ''
      return
    }

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          props.form.customIcon = result
        }
      }
      reader.readAsText(file)
    }
  }
}
</script>

<template>
  <Card label="Configuration" class="toast-form-card">
    <template #header>
      <button 
        v-if="isFormDirty" 
        class="clear-btn" 
        @click="clearForm"
      >
        Clear
      </button>
    </template>
    <div class="config-section">
      <div class="form-group">
        <label class="form-label">Type</label>
        <NotificationTypeSelector 
          v-model="form.type" 
          :has-custom-icon="!!form.customIcon" 
        />
      </div>

      <div class="form-group">
        <label class="form-label">Title</label>
        <Input v-model="form.title" placeholder="Notification title" />
      </div>

      <div class="form-group">
        <label class="form-label">Message</label>
        <TextArea v-model="form.message" placeholder="Notification message" :rows="3" />
      </div>

        <DurationSlider 
          v-model="form.duration" 
          :min="1" 
          :max="10" 
          :disabled="form.isPersistent"
          suffix="s"
          label="Duration"
          checkbox-label="Persistent (no auto-dismiss)"
          v-model:checkbox-value="form.isPersistent"
          :checkbox-disabled="!form.showCloseButton"
        />


      <div class="form-group">
        <label class="form-label">Position</label>
        <div class="position-grid">
          <button
            v-for="opt in POSITION_OPTIONS"
            :key="opt.value"
            :class="['position-btn', { active: form.position === opt.value }]"
            @click="form.position = opt.value"
          >
            {{ opt.text }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Style</label>
        <div class="style-row">
          <ColorPicker v-model="form.backgroundColor" label="Background" />
          <ColorPicker v-model="form.textColor" label="Text Color" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Options</label>
        <div class="options-row">
          <Checkbox v-model="form.showIcon" label="Show Icon" />
          <Checkbox v-model="form.showCloseButton" label="Show Close Button" />
        </div>
      </div>

      <div class="form-group" v-if="form.showIcon">
        <label class="form-label">Custom Icon (SVG)</label>
        <TextArea 
          v-model="form.customIcon" 
          placeholder="Paste SVG code here..." 
          :rows="2" 
          :maxlength="5000"
        />
        
        <div class="custom-icon-actions">
          <div class="right-actions">
            <button 
              v-if="!form.customIcon" 
              class="action-btn" 
              @click="autoFillHeart"
            >
              ❤️ Auto Fill
            </button>
            <button 
              v-else 
              class="action-btn clear-icon-btn" 
              @click="clearCustomIcon"
            >
              Clear
            </button>
            
            <div class="file-upload-container">
              <label class="file-upload-label">
                Or upload SVG file
                <input 
                  type="file" 
                  accept=".svg" 
                  @change="onFileUpload"
                  class="file-input"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <Segment 
        v-model="form.animation" 
        :options="ANIMATION_OPTIONS"
        label="Animation"
      />
    </div>
  </Card>
</template>

<style scoped>
.toast-form-card {
  height: 100%;
  box-shadow: var(--shadow-sm);
}

.clear-btn {
  background: transparent;
  border: none;
  color: var(--color-error);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: var(--color-error-soft);
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}



.duration-control {
  display: flex;
  align-items: center;
  gap: 12px;
}



.position-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.position-btn {
  padding: 10px;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.position-btn:hover {
  border-color: var(--color-text-muted);
}

.position-btn.active {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: var(--color-button-text, #fff);
}

.style-row {
  display: flex;
  gap: 1.5rem;
}



.options-row {
  display: flex;
  gap: 1.5rem;
}

:deep(.segment) {
  width: 100%;
  display: flex;
}

:deep(.segment-option) {
  flex: 1;
}

.hint {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  margin-top: 0.25rem;
}

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
  display: none;
}
</style>
