<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <label class="toggle-wrapper" :class="{ disabled }">
    <span v-if="label" class="toggle-label">{{ label }}</span>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      class="toggle"
      :class="{ active: modelValue }"
      @click="emit('update:modelValue', !modelValue)"
    >
      <div class="toggle-track" />
      <span class="toggle-knob" />
    </button>
  </label>
</template>

<style scoped>
.toggle-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.toggle-wrapper.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.toggle-label {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  user-select: none;
}

.toggle {
  position: relative;
  width: 120px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.toggle:focus {
  outline: none;
}

.toggle-track {
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
}

.toggle.active .toggle-track {
  background: linear-gradient(90deg, #a855f7 0%, #e0e0e0 100%);
}

.toggle-knob {
  position: absolute;
  left: 0;
  width: 16px;
  height: 16px;
  background: #a855f7;
  border-radius: 50%;
  transition: left 0.2s ease;
  box-shadow: 0 2px 6px rgba(168, 85, 247, 0.4);
  z-index: 1;
}

.toggle.active .toggle-knob {
  left: calc(100% - 16px);
}

.toggle:hover .toggle-knob {
  box-shadow: 0 2px 10px rgba(168, 85, 247, 0.6);
  transform: scale(1.1);
}

.toggle:focus .toggle-knob {
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
}
</style>
