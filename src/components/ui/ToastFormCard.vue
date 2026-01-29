<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from './Card.vue'
import PositionSelector from './PositionSelector.vue'
import Input from './Input.vue'
import TextArea from './TextArea.vue'
import Segment from './Segment.vue'
import DurationSlider from './DurationSlider.vue'
import ColorPicker from './ColorPicker.vue'
import NotificationTypeSelector from './NotificationTypeSelector.vue'
import CustomIconInput from './CustomIconInput.vue'
import OptionsGroup from './OptionsGroup.vue'
import FormSection from './FormSection.vue'
import type { FormState } from '../../types/notification'
import { useToastStore } from '../../composables/useToastStore'
import {
  ANIMATION_OPTIONS,
  DEFAULT_CONFIG,
} from '../../constants/notification'

interface Props {
  form: FormState
}

const props = defineProps<Props>()
const toastStore = useToastStore()
const { t } = useI18n()

const isFormDirty = computed(() => {
  const isDefault = props.form.title === DEFAULT_CONFIG.title &&
                    props.form.message === DEFAULT_CONFIG.message &&
                    props.form.customIcon === '' &&
                    props.form.presetName === '' &&
                    props.form.backgroundColor === DEFAULT_CONFIG.backgroundColor &&
                    props.form.type === DEFAULT_CONFIG.type &&
                    props.form.duration === DEFAULT_CONFIG.duration &&
                    props.form.position === DEFAULT_CONFIG.position && 
                    props.form.showIcon === DEFAULT_CONFIG.showIcon &&
                    props.form.showCloseButton === DEFAULT_CONFIG.showCloseButton &&
                    props.form.animation === DEFAULT_CONFIG.animation

  const isCleared = props.form.title === '' &&
                    props.form.message === '' &&
                    props.form.customIcon === '' &&
                    props.form.presetName === '' &&
                    props.form.backgroundColor === DEFAULT_CONFIG.backgroundColor &&
                    props.form.type === DEFAULT_CONFIG.type &&
                    props.form.duration === DEFAULT_CONFIG.duration &&
                    props.form.position === DEFAULT_CONFIG.position &&
                    props.form.showIcon === DEFAULT_CONFIG.showIcon &&
                    props.form.showCloseButton === DEFAULT_CONFIG.showCloseButton &&
                    props.form.animation === DEFAULT_CONFIG.animation

  return !(isDefault || isCleared)
})

const clearForm = () => {
  Object.assign(props.form, {
    ...DEFAULT_CONFIG,
    title: '',
    message: '',
    isPersistent: false,
    presetName: '',
    customIcon: ''
  })

  toastStore.addNotification({
    id: crypto.randomUUID(),
    type: 'success',
    title: t('defaults.info_title'),
    message: t('form.cleared_toast', 'Form cleared successfully'),
    duration: 3000,
    position: 'top-right',
    backgroundColor: 'var(--color-info)',
    textColor: 'var(--color-text)',
    showIcon: true,
    showCloseButton: true,
    animation: 'slide'
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
    title: t('form.error_title'),
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
  { id: 'showIcon', label: t('form.options.show_icon'), value: props.form.showIcon },
  { id: 'showCloseButton', label: t('form.options.show_close'), value: props.form.showCloseButton }
]);

const handleOptionUpdate = (id: string, value: boolean) => {
  if (id === 'showIcon') props.form.showIcon = value;
  if (id === 'showCloseButton') props.form.showCloseButton = value;
};

const animationOptions = computed(() => 
  ANIMATION_OPTIONS.map(opt => ({ ...opt, text: t(opt.text) }))
)

const emit = defineEmits<{
  (e: 'type-change', type: string): void
}>()

function handleTypeChange(newType: any) {
  props.form.type = newType
  emit('type-change', newType)
}
</script>

<template>
  <Card :label="t('form.card_title')" class="toast-form-card" id="tour-config-form">
    <template #header>
      <button 
        v-if="isFormDirty" 
        class="clear-btn" 
        @click="clearForm"
      >
        {{ t('form.clear') }}
      </button>
    </template>
    <div class="config-section">
        <NotificationTypeSelector 
          id="notification-type"
          name="type"
          test-id="type-selector"
          :model-value="form.type"
          @update:model-value="handleTypeChange" 
          :has-custom-icon="!!form.customIcon" 
          :label="t('form.labels.type')"
        />
        <Input 
          id="notification-title"
          name="title"
          :label="t('form.labels.title')"
          test-id="title-input"
          v-model="form.title" 
          :placeholder="t('form.placeholders.title')" 
        />
        <TextArea 
          id="notification-message"
          name="message"
          :label="t('form.labels.message')"
          test-id="message-input"
          v-model="form.message" 
          :placeholder="t('form.placeholders.message')" 
          :rows="3" 
        />
        <DurationSlider 
          id="notification-duration"
          name="duration"
          test-id="duration-slider"
          v-model="form.duration" 
          :min="1" 
          :max="10" 
          :disabled="form.isPersistent"
          suffix="s"
          :label="t('form.labels.duration')"
          :checkbox-label="t('form.labels.persistent')"
          v-model:checkbox-value="form.isPersistent"
          checkbox-test-id="persistent-checkbox"
          :checkbox-disabled="!form.showCloseButton"
        />
        <PositionSelector
          id="position-selector"
          name="position"
          test-id="position-selector"
          v-model="form.position"
          :label="t('form.labels.position')"
        />
      <OptionsGroup
        :options="optionsList"
        @update:option="handleOptionUpdate"
        :label="t('form.labels.options')"
      />

      <FormSection :label="t('form.style_section_title')">
        <div class="style-row">
          <ColorPicker 
            id="bg-color-picker"
            name="backgroundColor"
            test-id="bg-color-picker"
            v-model="form.backgroundColor" 
            :label="t('form.labels.background')" 
          />
          <ColorPicker 
            id="text-color-picker"
            name="textColor"
            test-id="text-color-picker"
            v-model="form.textColor" 
            :label="t('form.labels.text_color')" 
          />
        </div>
      </FormSection>


        <CustomIconInput
          v-if="form.showIcon"
          id="custom-icon-textarea"
          name="customIcon"
          :label="t('form.labels.custom_icon')"
          test-id="custom-icon-input"
          v-model="form.customIcon"
          :placeholder="t('form.placeholders.custom_icon')"
          :rows="2"
          :maxlength="5000"
          @error="handleCustomIconError"
        />

      <Segment 
        id="animation-segment"
        name="animation"
        test-id="animation-segment"
        v-model="form.animation" 
        :options="animationOptions"
        :label="t('form.labels.animation')"
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
