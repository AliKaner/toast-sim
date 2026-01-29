<script setup lang="ts">
</script>

<template>
  <footer class="app-footer">
    <slot />
  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;
  padding: 1.5rem 2rem;
  background: var(--color-surface);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--color-border);
  text-align: center;
  color: var(--color-text-muted);
}

@media (max-width: 480px) {
  .app-footer {
    padding: 1.5rem 1rem;
  }
}
</style>
