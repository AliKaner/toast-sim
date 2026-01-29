<script setup lang="ts">
import FormItemWrapper from './FormItemWrapper.vue'
interface SegmentOption {
    text: string;
    value: string | number;
}

interface SegmentProps {
    options: SegmentOption[];
    modelValue: string | number;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    error?: string;
    hint?: string;
    name?: string;
    id?: string;
    testId?: string;
    tabindex?: number | string;
}

const props = defineProps<SegmentProps>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
}>();

const handleSelect = (value: string | number) => {
    emit('update:modelValue', value);
};

import { computed } from 'vue';
const labelId = computed(() => props.id ? `${props.id}-label` : undefined);
</script>

<template>
  <FormItemWrapper 
    :label="label" 
    :required="required" 
    :error="error" 
    :hint="hint"
    :label-id="labelId"
    :id="id"
  >
    <div 
        :id="id"
        class="segment" 
        :class="{ 'segment--disabled': disabled }"
        :data-testid="testId"
        role="group"
        :aria-labelledby="labelId"
    >
        <button
            v-for="option in options"
            :key="option.value"
            class="segment-option"
            :class="{ 'segment-option--active': modelValue === option.value }"
            :disabled="disabled"
            :tabindex="tabindex"
            @click="handleSelect(option.value)"
        >
            <span class="segment-option-text">{{ option.text }}</span>
        </button>
    </div>
  </FormItemWrapper>
</template>

<style scoped>
.segment {
    display: inline-flex;
    padding: 0.5rem;
    gap: 0.5rem;
}

.segment--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.segment-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 500;
    color: var(--color-text);
    background-color: transparent;
    border: 0.0625rem solid var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
}

.segment-option:hover:not(:disabled):not(.segment-option--active) {
    color: var(--color-text);
    background-color: var(--color-surface-hover);
}

.segment-option--active {
    color: var(--color-button-text, #fff);
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    box-shadow: 0 0.125rem 0.5rem var(--color-primary-soft);
    border-radius: var(--radius-md);
}

.segment-option:disabled {
    cursor: not-allowed;
}

.segment-option-text {
    white-space: nowrap;
}
</style>
