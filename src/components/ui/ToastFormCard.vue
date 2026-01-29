<script setup lang="ts">
import { computed, watch } from 'vue'
import Card from './Card.vue'
import PositionSelector from './PositionSelector.vue'
import Input from './Input.vue'
import TextArea from './TextArea.vue'
import Segment from './Segment.vue'
import DurationSlider from './DurationSlider.vue'
import ColorPicker from './ColorPicker.vue'
import Checkbox from './Checkbox.vue'
import NotificationTypeSelector from './NotificationTypeSelector.vue'
import CustomIconInput from './CustomIconInput.vue'
import OptionsGroup from './OptionsGroup.vue'
import FormItemWrapper from './FormItemWrapper.vue'
import FormSection from './FormSection.vue'
import type { FormState } from '../../types/notification'
import { useToastStore } from '../../composables/useToastStore'
import {
  ANIMATION_OPTIONS,
  DEFAULT_CONFIG,
  POSITION_OPTIONS,
  TYPE_OPTIONS
} from '../../constants/notification'

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

watch(() => props.form.showCloseButton, (newVal) => {
  if (!newVal && props.form.isPersistent) {
    props.form.isPersistent = false
  }
})

const handleCustomIconError = (message: string) => {
  toastStore.addNotification({
    id: crypto.randomUUID(),
    type: 'error',
    title: 'Error',
    message: message,
    duration: 3000,
    position: 'top-right',
    backgroundColor: 'var(--color-error)',
    textColor: 'var(--color-button-text, #fff)',
    showIcon: true,
    showCloseButton: true,
    animation: 'slide'
  })
}


const optionsList = computed(() => [
  { id: 'showIcon', label: 'Show Icon', value: props.form.showIcon },
  { id: 'showCloseButton', label: 'Show Close Button', value: props.form.showCloseButton }
]);

const handleOptionUpdate = (id: string, value: boolean) => {
  if (id === 'showIcon') props.form.showIcon = value;
  if (id === 'showCloseButton') props.form.showCloseButton = value;
};
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
        <NotificationTypeSelector 
          id="notification-type"
          name="type"
          test-id="type-selector"
          tabindex="1"
          v-model="form.type" 
          :has-custom-icon="!!form.customIcon" 
          label="Type"
        />
        <Input 
          id="notification-title"
          name="title"
          label="Title"
          test-id="title-input"
          tabindex="2"
          v-model="form.title" 
          placeholder="Notification title" 
        />
        <TextArea 
          id="notification-message"
          name="message"
          label="Message"
          test-id="message-input"
          tabindex="3"
          v-model="form.message" 
          placeholder="Notification message" 
          :rows="3" 
        />
        <DurationSlider 
          id="notification-duration"
          name="duration"
          test-id="duration-slider"
          tabindex="4"
          v-model="form.duration" 
          :min="1" 
          :max="10" 
          :disabled="form.isPersistent"
          suffix="s"
          label="Duration"
          checkbox-label="Persistent (no auto-dismiss)"
          v-model:checkbox-value="form.isPersistent"
          checkbox-test-id="persistent-checkbox"
          checkbox-tabindex="5"
          :checkbox-disabled="!form.showCloseButton"
        />
        <PositionSelector
          id="position-selector"
          name="position"
          test-id="position-selector"
          tabindex="6"
          v-model="form.position"
          label="Position"
        />
      <OptionsGroup
        :options="optionsList"
        @update:option="handleOptionUpdate"
        label="Options"
      />

      <FormSection label="Style">
        <div class="style-row">
          <ColorPicker 
            id="bg-color-picker"
            name="backgroundColor"
            test-id="bg-color-picker"
            tabindex="7"
            v-model="form.backgroundColor" 
            label="Background" 
          />
          <ColorPicker 
            id="text-color-picker"
            name="textColor"
            test-id="text-color-picker"
            tabindex="8"
            v-model="form.textColor" 
            label="Text Color" 
          />
        </div>
      </FormSection>

        <CustomIconInput
          v-if="form.showIcon"
          id="custom-icon-textarea"
          name="customIcon"
          label="Custom Icon (SVG)"
          test-id="custom-icon-input"
          tabindex="11"
          v-model="form.customIcon"
          placeholder="Paste SVG code here..."
          :rows="2"
          :maxlength="5000"
          @error="handleCustomIconError"
        />

      <Segment 
        id="animation-segment"
        name="animation"
        test-id="animation-segment"
        tabindex="12"
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


</style>
