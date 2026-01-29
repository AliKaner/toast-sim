<script setup lang="ts">
import TextArea from './TextArea.vue';
import CustomIconActions from './CustomIconActions.vue';
import FormItemWrapper from './FormItemWrapper.vue';

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxlength?: number;
  id?: string;
  name?: string;
  testId?: string;
  tabindex?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 2,
  maxlength: 5000,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'error', message: string): void;
}>();

const HEART_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

const handleAutoFill = () => {
  emit('update:modelValue', HEART_SVG);
};

const handleClear = () => {
  emit('update:modelValue', '');
};

const handleUpload = (content: string) => {
  emit('update:modelValue', content);
};

const handleError = (message: string) => {
  emit('error', message);
};
</script>

<template>
  <FormItemWrapper 
    :label="label" 
    :for="id"
  >
    <div class="custom-icon-input">
      <TextArea 
        :id="id"
        :name="name"
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        :placeholder="placeholder"
        :rows="rows"
        :maxlength="maxlength"
        :data-testid="testId ? `${testId}-textarea` : undefined"
        :tabindex="tabindex"
      />
      
      <CustomIconActions 
        :has-custom-icon="!!modelValue"
        :test-id="testId ? `${testId}-actions` : undefined"
        :tabindex="tabindex"
        @auto-fill="handleAutoFill"
        @clear="handleClear"
        @upload="handleUpload"
        @error="handleError"
      />
    </div>
  </FormItemWrapper>
</template>

<style scoped>
.custom-icon-input {
  display: flex;
  flex-direction: column;
}
</style>
