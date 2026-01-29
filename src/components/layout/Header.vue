<script setup lang="ts">
import ThemeSwitch from '@/components/ui/ThemeSwitch.vue'
import LanguageSwitch from '@/components/ui/LanguageSwitch.vue'
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <img src="/faviconV2.png" alt="Logo" class="header-logo" />
      <div class="header-content">
        <slot />
      </div>
    </div>
    <div class="header-actions">
      <LanguageSwitch />
      <ThemeSwitch />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  width: 100%;
  padding: 0.75rem 2rem;
  background: var(--color-surface);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  height: 32px;
  width: auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 480px) {
  .app-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
