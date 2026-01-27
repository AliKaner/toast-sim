<script setup lang="ts">
interface CheckboxProps {
    modelValue: boolean;
    label?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
}

defineProps<CheckboxProps>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.checked);
};
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
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-border);
    border-radius: 4px;
    background-color: transparent;
    transition: all 0.2s ease;
}

.checkbox-icon {
    width: 14px;
    height: 14px;
    color: white;
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
    box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

.checkbox:hover:not(.checkbox--disabled) .checkbox-box {
    border-color: var(--color-primary);
}

.checkbox-label {
    font-size: 0.875rem;
    color: var(--color-text);
}
</style>
