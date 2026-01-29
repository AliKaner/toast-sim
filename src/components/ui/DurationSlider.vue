<script setup lang="ts">
import Slider from './Slider.vue'
import Checkbox from './Checkbox.vue'

interface DurationSliderProps {
  modelValue: number
  min?: number
  max?: number
  disabled?: boolean
  suffix?: string
  label?: string
  required?: boolean
  error?: string
  hint?: string
  checkboxLabel?: string
  checkboxValue?: boolean
  checkboxDisabled?: boolean
  name?: string
  id?: string
  testId?: string
  tabindex?: number | string
  checkboxTestId?: string
  checkboxTabindex?: number | string
}

defineProps<DurationSliderProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'update:checkboxValue', value: boolean): void
  (e: 'update:checkboxValue', value: boolean): void
}>()
</script>

<template>
  <Slider
    :model-value="modelValue"
    :min="min"
    :max="max"
    :disabled="disabled"
    :suffix="suffix"
    :label="label"
    :required="required"
    :error="error"
    :hint="hint"
    :name="name"
    :id="id"
    :test-id="testId"
    :tabindex="tabindex"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <Checkbox
      v-if="checkboxLabel"
      :model-value="checkboxValue"
      :label="checkboxLabel"
      :disabled="checkboxDisabled"
      :test-id="checkboxTestId"
      :tabindex="checkboxTabindex"
      @update:model-value="emit('update:checkboxValue', $event)"
    />
  </Slider>
</template>
