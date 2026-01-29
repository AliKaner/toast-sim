<script setup lang="ts">
</script>

<template>
  <main class="app-body">
    <slot />
  </main>
</template>

<style scoped>
.app-body {
  flex: 1;
  width: 100%;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 480px) {
  .app-body {
    padding: 1rem;
  }
}
</style>
