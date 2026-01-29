<script setup lang="ts"></script>

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
  max-width: 87.5rem;
  margin: 0 auto;
}

@media (max-width: 30rem) {
  .app-body {
    padding: 1rem;
  }
}
</style>
