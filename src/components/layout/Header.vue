<script setup lang="ts">
import ThemeSwitch from '@/components/ui/ThemeSwitch.vue'
import LanguageSwitch from '@/components/ui/LanguageSwitch.vue'

defineEmits<{
  (e: 'start-tour'): void
}>()
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
      <button class="demo-btn" @click="$emit('start-tour')">Demo</button>
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

.demo-btn {
  background: var(--color-primary-soft);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-soft);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-btn:hover {
  background: var(--color-primary);
  color: #fff;
}

@media (max-width: 480px) {
  .app-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: auto;
    position: relative;
  }

  .header-left {
    position: static;
    transform: none;
    width: 100%;
    justify-content: center;
    pointer-events: auto;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
