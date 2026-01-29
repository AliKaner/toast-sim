<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'


useTheme()
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
:root {
  --color-primary: #6400ee;
  --color-primary-soft: rgba(100, 0, 238, 0.1);
  --color-secondary: #35495e;
  

  --color-success: #5bca4d;
  --color-success-soft: rgba(91, 202, 77, 0.1);
  --color-error: #d84947;
  --color-error-soft: rgba(216, 73, 71, 0.1);
  --color-warning: #e3a600;
  --color-warning-soft: rgba(227, 166, 0, 0.1);
  --color-info: #666efd;
  --color-info-soft: rgba(102, 110, 253, 0.1);


  --color-bg: #1a1a2e;
  --color-surface: #1e293b;
  --color-text: #ffffff;
  --color-text-muted: #94a3b8;
  --color-text-secondary: #64748b;
  --color-border: #334155;
  --color-input-bg: #1e293b;
  --color-preview-bg: #16213e;
  

  --radius-xxl: 16px;
  --radius-xl: 14px;
  --radius-lg: 12px;
  --radius-base: 10px;
  --radius-md: 8px;
  --radius-sm: 6px;
  --radius-xs: 4px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);


  --bg-gradient-start: #1a1a2e;
  --bg-gradient-end: #16213e;
}

[data-theme='light'] {
  --color-bg: #f0f1f5;
  --color-surface: #ffffff;
  --color-text: #000000;
  --color-text-muted: #555555;
  --color-text-secondary: #475569;
  --color-border: #e0e0e1;
  --color-input-bg: #ffffff;
  --color-preview-bg: #f7f8fa;
  

  --bg-gradient-start: #f0f1f5;
  --bg-gradient-end: #f0f1f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
  color: var(--color-text);
  min-height: 100vh;
  transition: background 0.3s ease, color 0.3s ease;
}


::-webkit-scrollbar {
  width: 0.375rem;
  height: 0.375rem;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 0.625rem;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-secondary);
}


* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

#app {
  width: 100%;
  min-height: 100vh;
  position: relative;
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.6s ease;
}

.bounce-leave-active {
  animation: bounce-in 0.6s ease reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

</style>
