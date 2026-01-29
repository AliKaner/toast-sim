<script setup lang="ts">
interface CardProps {
  label?: string
}

defineProps<CardProps>()
</script>

<template>
  <div class="card">
    <div v-if="label || $slots.header" class="card-header">
      <div v-if="label" class="card-label">{{ label }}</div>
      <div class="card-header-actions">
        <slot name="header" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.card {
  position: relative;
  background: var(--color-surface);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.card-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
