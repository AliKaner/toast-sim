<script setup lang="ts">
import { computed } from 'vue';
import Spinner from './Spinner.vue';

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
    variant?: 'base' | 'outline';
    size?: 'default' | 'small';
}
const props = withDefaults(defineProps<ButtonProps>(), {
    variant: 'base',
    size: 'default'
});

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
    if (props.onClick) {
        props.onClick();
    } else {
        emit('click', event);
    }
};

const computedClasses = computed(() => [
    'button',
    `button--${props.variant}`,
    `button--${props.size}`,
    props.className,
]);
</script>

<template>
    <button
        :class="computedClasses"
        :id="id"
        :name="name"
        :aria-label="ariaLabel"
        :data-testid="testId"
        :type="type"
        :disabled="disabled"
        @click="handleClick"
    >
        <span v-if="loading" class="button-loading">
            <Spinner size="small" />
        </span>
        <span v-else-if="text">{{ text }}</span>
        <slot v-else></slot>
    </button>
</template>

<style scoped>
.button {
    width: 100%;
    font-family: inherit;
    border-radius: var(--radius-md);
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button--default {
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 0.875rem;
}

.button--small {
    height: 1.75rem;
    padding: 0 0.5rem;
    font-size: 0.75rem;
    border-radius: var(--radius-sm);
}

.button--base {
    color: var(--color-button-text, #fff);
    background-color: var(--color-primary);
    border: 0.0625rem solid var(--color-primary);
}

.button--base:hover:not(:disabled) {
    background-color: var(--color-primary-hover, var(--color-primary));
    opacity: 0.9;
}

.button--base:active:not(:disabled) {
    opacity: 0.8;
}

.button--outline {
    color: var(--color-text);
    background-color: transparent;
    border: 0.0625rem solid var(--color-border);
}

.button--outline:hover:not(:disabled) {
    border-color: var(--color-text);
}

.button--outline:active:not(:disabled) {
    background-color: var(--color-surface);
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
</style>
