<script setup lang="ts">
import { computed } from 'vue';
import type { InputType } from '../../types/notification';

interface Props {
  modelValue: string;
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  autocomplete?: string;
  maxlength?: number;
  label?: string;
  name?: string;
  id?: string;
  testId?: string;
  tabindex?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const uniqueId = crypto.randomUUID();
const inputId = computed(() => props.id || uniqueId);
const errorId = computed(() => props.error ? `${inputId}-error` : undefined);

const inputClasses = computed(() => ({
  'base-input': true,
  'base-input--error': !!props.error,
  'base-input--disabled': props.disabled,
}));

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};
import FormItemWrapper from './FormItemWrapper.vue';
</script>


<template>
  <FormItemWrapper :label="label" :for="inputId" :error="error">
    <input
      :id="inputId"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClasses"
      :aria-label="ariaLabel"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : ariaDescribedBy"
      :autocomplete="autocomplete"
      :maxlength="maxlength"
      :data-testid="testId"
      :tabindex="tabindex"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </FormItemWrapper>
</template>

<style scoped>


.base-input {
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-family: inherit;
  color: var(--color-text);
  background-color: var(--color-input-bg);
  border: 0.0625rem solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  transition: all 0.2s ease;
}

.base-input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.7;
}

.base-input:hover:not(:disabled) {
  border-color: var(--color-primary);
}

.base-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.1875rem var(--color-primary-soft);
}

.base-input--error {
  border-color: var(--color-error);
  background-color: var(--color-error-soft);
}

.base-input--error:focus {
  box-shadow: 0 0 0 0.1875rem var(--color-error-soft);
}

.base-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--color-secondary);
}
</style>
