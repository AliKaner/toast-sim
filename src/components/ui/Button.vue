<script setup lang="ts">
interface ButtonProps {
    id?: string;
    name?: string;
    ariaLabel?: string;
    testId?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    text?: string;
    onClick?: () => void;
    className?: string;
}
const props = defineProps<ButtonProps>();

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
    emit('click', event);
    props.onClick?.();
};

</script>

<template>
    <button
    class="button"
        :id="id"
        :name="name"
        :aria-label="ariaLabel"
        :data-testid="testId"
        :type="type"
        :disabled="disabled"
        :class="className"
        @click="handleClick"
    >
        <span v-if="loading" class="button-loading">
            <span class="button-loading-spinner"></span>
        </span>
        <span v-else-if="text">{{ text }}</span>
        <slot v-else></slot>
    </button>
</template>

<style scoped>
.button {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    font-family: inherit;
    color: var(--color-text);
    background-color: var(--color-primary);
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-lg);
    outline: none;
    transition: all 0.2s ease;
}

.button:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
}

.button:active:not(:disabled) {
    background-color: var(--color-primary-active);
    border-color: var(--color-primary-active);
}

.button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
}

.button-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.button-loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--color-text);
    border-top-color: transparent;
    border-radius: 50%;
    animation: button-loading-spinner 0.5s linear infinite;
}

@keyframes button-loading-spinner {
    to {
        transform: rotate(360deg);
    }
}
</style>
