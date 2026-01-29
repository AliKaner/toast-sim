<script setup lang="ts">
interface SwitchProps {
  modelValue: boolean
  label?: string
  disabled?: boolean
}

defineProps<SwitchProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <label class="switch-wrapper" :class="{ disabled }">
    <span v-if="label" class="switch-label">{{ label }}</span>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      class="switch"
      :class="{ active: modelValue }"
      @click="emit('update:modelValue', !modelValue)"
    >
      <div class="switch-track" />
      <span class="switch-knob" />
    </button>
  </label>
</template>

<style scoped>
.switch-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.switch-wrapper.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.switch-label {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  user-select: none;
}

.switch {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.switch:focus {
  outline: none;
}

.switch-track {
  position: absolute;
  left: 0;
  right: 0;
  height: 1.5rem;
  background: var(--color-switch-track, #e0e0e0);
  border-radius: 0.75rem;
  transition: background 0.2s ease;
}

.switch.active .switch-track {
  background: var(--color-primary);
}

.switch-knob {
  position: absolute;
  left: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background: var(--color-button-text, #fff);
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 0.125rem 0.25rem var(--color-shadow, rgba(0, 0, 0, 0.2));
  z-index: 1;
}

.switch.active .switch-knob {
  transform: translateX(1.25rem);
}

.switch:hover .switch-knob {
  transform: scale(1.05);
}

.switch.active:hover .switch-knob {
  transform: translateX(1.25rem) scale(1.05);
}

.switch:focus .switch-track {
  box-shadow: 0 0 0 0.1875rem var(--color-primary-soft);
}
</style>
