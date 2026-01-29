<script setup lang="ts">
interface CheckboxProps {
  modelValue: boolean
  label?: string
  disabled?: boolean
  id?: string
  name?: string
  testId?: string
  tabindex?: number | string
}

defineProps<CheckboxProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <label class="checkbox" :class="{ 'checkbox--disabled': disabled }">
    <input
      type="checkbox"
      class="checkbox-input"
      :id="id"
      :name="name"
      :checked="modelValue"
      :disabled="disabled"
      :data-testid="testId"
      :tabindex="tabindex"
      @change="handleChange"
    />
    <span class="checkbox-box">
      <svg
        class="checkbox-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span v-if="label" class="checkbox-label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: 0.125rem solid var(--color-text-muted);
  border-radius: 0.25rem;
  background-color: transparent;
  transition: all 0.2s ease;
}

.checkbox-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--color-button-text, #fff);
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}

.checkbox-input:checked + .checkbox-box {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox-input:checked + .checkbox-box .checkbox-icon {
  opacity: 1;
  transform: scale(1);
}

.checkbox-input:focus + .checkbox-box {
  box-shadow: 0 0 0 0.1875rem var(--color-primary-soft);
}

.checkbox:hover:not(.checkbox--disabled) .checkbox-box {
  border-color: var(--color-primary);
}

.checkbox-label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
</style>
