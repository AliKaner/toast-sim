<script setup lang="ts">
import { computed, ref } from 'vue'
import FormItemWrapper from './FormItemWrapper.vue'
import { useSliderDrag } from '../../composables/useSliderDrag'

interface SliderProps {
  modelValue: number
  min?: number
  max?: number
  disabled?: boolean
  suffix?: string
  label?: string
  required?: boolean
  error?: string
  hint?: string
  name?: string
  id?: string
  testId?: string
  tabindex?: number | string
}

const props = defineProps<SliderProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const minValue = computed(() => props.min ?? 0)
const maxValue = computed(() => props.max ?? 100)
const isDisabled = computed(() => props.disabled ?? false)

const percentage = computed(() => {
  const range = maxValue.value - minValue.value
  if (range === 0) return 0
  return ((props.modelValue - minValue.value) / range) * 100
})

const knobPosition = computed(() => {
  return `calc(${percentage.value}% - 10px)`
})

const containerRef = ref<HTMLElement | null>(null)

const { isDragging, startDrag } = useSliderDrag({
  containerRef,
  min: minValue,
  max: maxValue,
  disabled: isDisabled,
  onValueChange: (value: number) => emit('update:modelValue', value)
})

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}
</script>

<template>
  <FormItemWrapper
    :label="label"
    :required="required"
    :error="error"
    :hint="hint"
    no-focus-color
    :for="id"
  >
    <div class="slider-container" :class="{ dragging: isDragging }">
      <div class="slider-header" :class="{ disabled }">
        <div
          ref="containerRef"
          class="slider-bar-container"
          @mousedown="startDrag"
          @touchstart="startDrag"
        >
          <input
            type="range"
            :id="id"
            :name="name"
            :min="minValue"
            :max="maxValue"
            :value="modelValue"
            :disabled="disabled"
            class="slider-input"
            :data-testid="testId"
            :tabindex="tabindex"
            @input="handleInput"
          />
          <div class="slider-track">
            <div class="slider-fill" :style="{ width: `${percentage}%` }" />
          </div>
          <div class="slider-knob" :style="{ left: knobPosition }" />
        </div>
        <span class="slider-value">{{ modelValue }}{{ suffix }}</span>
      </div>
      <slot />
    </div>
  </FormItemWrapper>
</template>

<style scoped>
.slider-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.slider-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.slider-bar-container {
  position: relative;
  flex: 1;
  height: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  touch-action: none;
}

.slider-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.slider-track {
  position: absolute;
  width: 100%;
  height: 0.25rem;
  background: var(--color-border);
  border-radius: 0.125rem;
  overflow: hidden;
}

.slider-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 0.125rem;
  transition: width 0.05s ease-out;
}

.dragging .slider-fill {
  transition: none;
}

.slider-knob {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  background: var(--color-primary);
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  pointer-events: none;
  transition:
    left 0.05s ease-out,
    transform 0.15s ease;
}

.dragging .slider-knob {
  transition: transform 0.15s ease;
  transform: scale(1.1);
}

.slider-bar-container:hover .slider-knob {
  transform: scale(1.1);
}

.slider-value {
  min-width: 3rem;
  text-align: right;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
