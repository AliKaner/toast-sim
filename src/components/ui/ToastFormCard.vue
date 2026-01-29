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
import type { FormState, NotificationType } from '@/types/notification'
import { useToastStore } from '@/stores/useToastStore'
import { randomId } from '@/utils/random'
import { ANIMATION_OPTIONS, DEFAULT_CONFIG } from '@/constants/notification'

const form = defineModel<FormState>('form', { required: true })
const toastStore = useToastStore()
const { t } = useI18n()

const isCleared = computed(
  () => !form.value.title && !form.value.message && !form.value.customIcon && !form.value.presetName
)

const isDefault = computed(() =>
  Object.entries(DEFAULT_CONFIG).every(([key, value]) => form.value[key as keyof FormState] === value)
)

const isFormDirty = computed(() => !(isCleared.value || isDefault.value))

const clearForm = () => {
  Object.assign(form.value, {
    ...DEFAULT_CONFIG,
    title: '',
    message: '',
    isPersistent: false,
    presetName: '',
    customIcon: ''
  })

  toastStore.addNotification({
    id: randomId(),
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

watch(
  () => form.value.showCloseButton,
  (newVal) => {
    if (!newVal && form.value.isPersistent) {
      form.value.isPersistent = false
    }
  }
)

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
  { id: 'showIcon', label: t('form.options.show_icon'), value: form.value.showIcon },
  { id: 'showCloseButton', label: t('form.options.show_close'), value: form.value.showCloseButton }
])

const handleOptionUpdate = (id: string, value: boolean) => {
  if (id === 'showIcon') form.value.showIcon = value
  if (id === 'showCloseButton') form.value.showCloseButton = value
}

const animationOptions = computed(() =>
  ANIMATION_OPTIONS.map((opt) => ({ ...opt, text: t(opt.text) }))
)

const emit = defineEmits<{
  'type-change': [type: NotificationType]
}>()

function handleTypeChange(newType: NotificationType) {
  form.value.type = newType
  emit('type-change', newType)
}
</script>

<template>
  <Card :label="t('form.card_title')" class="toast-form-card" id="tour-config-form">
    <template #header>
      <button v-if="isFormDirty" class="clear-btn" @click="clearForm">
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
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: var(--color-error-soft);
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.duration-control {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.position-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
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
