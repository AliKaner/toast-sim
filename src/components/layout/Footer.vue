<script setup lang="ts"></script>

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
  backdrop-filter: blur(0.625rem);
  border-top: 0.0625rem solid var(--color-border);
  text-align: center;
  color: var(--color-text-muted);
}

@media (max-width: 30rem) {
  .app-footer {
    padding: 1.5rem 1rem;
  }
}
</style>
