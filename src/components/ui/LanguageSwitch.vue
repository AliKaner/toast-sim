<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

const { locale } = useI18n()

watch(locale, (newLocale) => {
  localStorage.setItem('user-locale', newLocale)
})
</script>

<template>
  <div class="language-switch">
    <button class="lang-btn" :class="{ active: locale === 'en' }" @click="locale = 'en'">EN</button>
    <span class="divider">|</span>
    <button class="lang-btn" :class="{ active: locale === 'tr' }" @click="locale = 'tr'">TR</button>
  </div>
</template>

<style scoped>
.language-switch {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--color-background-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 0.0625rem solid var(--color-border);
}

.lang-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  padding: 0.125rem 0.25rem;
  transition: all 0.2s ease;
}

.lang-btn:hover {
  color: var(--color-text);
}

.lang-btn.active {
  color: var(--color-primary);
  font-weight: 700;
}

.divider {
  color: var(--color-border);
  font-size: 0.875rem;
}
</style>
