<script setup lang="ts">

import FormItemWrapper from './FormItemWrapper.vue';
import Checkbox from './Checkbox.vue';

interface Option {
  id: string;
  label: string;
  value: boolean;
  disabled?: boolean;
}

interface OptionsGroupProps {
  label?: string;
  options: Option[];
  id?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const props = defineProps<OptionsGroupProps>();

const emit = defineEmits<{
  (e: 'update:option', id: string, value: boolean): void;
}>();

const handleOptionUpdate = (id: string, value: boolean) => {
  emit('update:option', id, value);
};
</script>

<template>
  <FormItemWrapper
    :label="label"
    :id="id"
    :error="error"
    :hint="hint"
    :required="required"
    no-focus-color
  >
    <div class="options-grid">
      <Checkbox
        v-for="option in options"
        :key="option.id"
        :model-value="option.value"
        :label="option.label"
        :disabled="option.disabled"
        :test-id="`option-${option.id}`"
        @update:model-value="(val) => handleOptionUpdate(option.id, val)"
      />
    </div>
  </FormItemWrapper>
</template>

<style scoped>
.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
}
</style>
