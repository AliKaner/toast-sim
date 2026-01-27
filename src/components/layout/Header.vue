<script setup lang="ts">
</script>

<template>
  <header class="app-header">
    <slot />
  </header>
</template>

<style scoped>
.app-header {
  width: 100%;
  padding: 1.5rem 2rem;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
