<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  maxlength?: number;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  label?: string;
  name?: string;
  id?: string;
  testId?: string;
  tabindex?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  rows: 4,
  resize: 'vertical',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const uniqueId = crypto.randomUUID();
const textareaId = computed(() => props.id || uniqueId);
const errorId = computed(() => props.error ? `${textareaId}-error` : undefined);

const textareaClasses = computed(() => ({
  'base-textarea': true,
  'base-textarea--error': !!props.error,
  'base-textarea--disabled': props.disabled,
}));

const textareaStyle = computed(() => ({
  resize: props.resize,
}));

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
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
  <FormItemWrapper :label="label" :for="textareaId" :error="error">
    <textarea
      :id="textareaId"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="textareaClasses"
      :style="textareaStyle"
      :aria-label="ariaLabel"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : ariaDescribedBy"
      :maxlength="maxlength"
      :rows="rows"
      :data-testid="testId"
      :tabindex="tabindex"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </FormItemWrapper>
</template>

<style scoped>


.base-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-text);
  background-color: var(--color-input-bg);
  border: 0.125rem solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  transition: all 0.2s ease;
  min-height: 6.25rem;
}

.base-textarea::placeholder {
  color: var(--color-text-muted);
  opacity: 0.7;
}

.base-textarea:hover:not(:disabled) {
  border-color: var(--color-primary);
}

.base-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.1875rem var(--color-primary-soft);
}

.base-textarea--error {
  border-color: var(--color-error);
  background-color: var(--color-error-soft);
}

.base-textarea--error:focus {
  box-shadow: 0 0 0 0.1875rem var(--color-error-soft);
}

.base-textarea::-webkit-scrollbar {
  width: 0.25rem;
}

.base-textarea::-webkit-scrollbar-track {
  background: transparent;
}

.base-textarea::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 0.25rem;
}

.base-textarea::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-secondary);
}

.base-textarea::-webkit-resizer {
  background-image: linear-gradient(135deg, transparent 50%, var(--color-border) 50%);
  background-origin: content-box;
  background-clip: content-box;
}

.base-textarea--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--color-secondary);
}
</style>
