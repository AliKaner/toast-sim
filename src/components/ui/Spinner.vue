<script setup lang="ts">
interface SpinnerProps {
  size?: 'small' | 'default' | 'large'
}

withDefaults(defineProps<SpinnerProps>(), {
  size: 'default'
})
</script>

<template>
  <span class="spinner" :class="`spinner--${size}`"></span>
</template>

<style scoped>
.spinner {
  display: inline-block;
  border: 0.125rem solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
}

.spinner--small {
  width: 0.75rem;
  height: 0.75rem;
}

.spinner--default {
  width: 1rem;
  height: 1rem;
}

.spinner--large {
  width: 1.5rem;
  height: 1.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
