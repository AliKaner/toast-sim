<script setup lang="ts">
interface SegmentOption {
    text: string;
    icon?: string;
    value: string | number;
}

interface SegmentProps {
    options: SegmentOption[];
    modelValue: string | number;
    disabled?: boolean;
    variant?: 'primary' | 'success';
}

defineProps<SegmentProps>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
}>();

const handleSelect = (value: string | number) => {
    emit('update:modelValue', value);
};
</script>

<template>
    <div class="segment" :class="[
        { 'segment--disabled': disabled },
        `segment--${variant || 'primary'}`
    ]">
        <button
            v-for="option in options"
            :key="option.value"
            class="segment-option"
            :class="{ 'segment-option--active': modelValue === option.value }"
            :disabled="disabled"
            @click="handleSelect(option.value)"
        >
            <span v-if="option.icon" class="segment-option-icon">{{ option.icon }}</span>
            <span class="segment-option-text">{{ option.text }}</span>
        </button>
    </div>
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
    gap: 4px;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 500;
    color: var(--color-text-muted);
    background-color: transparent;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
}

.segment-option:hover:not(:disabled):not(.segment-option--active) {
    color: var(--color-text);
    background-color: rgba(255, 255, 255, 0.05);
}

.segment-option--active {
    color: var(--color-text);
    border-radius: 3px;
}

.segment--primary .segment-option--active {
    background-color: var(--color-primary);
    box-shadow: 0 2px 8px rgba(66, 184, 131, 0.3);
}

.segment--success .segment-option--active {
    background-color: var(--color-success, #22c55e);
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
}

.segment-option:disabled {
    cursor: not-allowed;
}

.segment-option-icon {
    font-size: 1rem;
}

.segment-option-text {
    white-space: nowrap;
}
</style>
