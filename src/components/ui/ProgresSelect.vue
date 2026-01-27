<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: number
  min?: number
  max?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const minValue = computed(() => props.min ?? 0)
const maxValue = computed(() => props.max ?? 100)

const percentage = computed(() => {
  const range = maxValue.value - minValue.value
  if (range === 0) return 0
  return ((props.modelValue - minValue.value) / range) * 100
})

const knobPosition = computed(() => {
  // Knob 50px, track genişliği hesaplanacak
  return `calc(${percentage.value}% - 25px)`
})

const isDragging = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}

const startDrag = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return
  isDragging.value = true
  updateValueFromEvent(event)
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  updateValueFromEvent(event)
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

const updateValueFromEvent = (event: MouseEvent | TouchEvent) => {
  if (!containerRef.value) return
  
  const rect = containerRef.value.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  
  // Knob genişliği 50px hesaba katılıyor
  const knobRadius = 25
  const trackStart = rect.left + knobRadius
  const trackEnd = rect.right - knobRadius
  const trackWidth = trackEnd - trackStart
  
  let relativeX = clientX - trackStart
  relativeX = Math.max(0, Math.min(relativeX, trackWidth))
  
  const percent = relativeX / trackWidth
  const range = maxValue.value - minValue.value
  const newValue = Math.round(minValue.value + percent * range)
  
  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="progress-select" :class="{ disabled, dragging: isDragging }">
    <div 
      ref="containerRef"
      class="progress-bar-container"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <input
        type="range"
        :min="minValue"
        :max="maxValue"
        :value="modelValue"
        :disabled="disabled"
        class="progress-slider"
        @input="handleInput"
      />
      <div class="progress-track">
        <div 
          class="progress-fill" 
          :style="{ width: `${percentage}%` }"
        />
      </div>
      <div 
        class="progress-knob"
        :style="{ left: knobPosition }"
      />
    </div>
    <span class="progress-value">{{ modelValue }}</span>
  </div>
</template>

<style scoped>
.progress-select {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.progress-select.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.progress-value {
  min-width: 3rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  text-align: center;
}

.progress-bar-container {
  position: relative;
  flex: 1;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.progress-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
  margin: 0;
}

.progress-track {
  width: 100%;
  height: 20px;
  background: var(--color-border);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary) 0%, #34d399 100%);
  border-radius: 10px;
}

.progress-knob {
  position: absolute;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #34d399 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
  cursor: grab;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
  z-index: 2;
}

.progress-select.dragging .progress-knob {
  cursor: grabbing;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.5);
}

.progress-knob:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(66, 184, 131, 0.5);
}

.progress-slider:focus ~ .progress-knob {
  box-shadow: 0 0 0 3px var(--color-primary-soft), 0 4px 12px rgba(66, 184, 131, 0.4);
}
</style>
