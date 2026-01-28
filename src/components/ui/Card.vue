<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="card">
    <span v-if="label" class="card-label">{{ label }}</span>
    <slot />
  </div>
</template>

<style scoped>
.card {
  position: relative;
  background: var(--color-surface);

  border-radius: 8px;
  padding: 24px;
}

.card-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: var(--color-surface);
  padding: 0 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
}
</style>
