<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <RouterView />
</template>

<style lang="scss">
$primary-color: #42b883;
$secondary-color: #35495e;
$background-color: #1a1a2e;
$text-color: #ffffff;
$box-shadow: 0 4px 20px rgba(66, 184, 131, 0.3);

:root {
  --color-primary: #42b883;
  --color-primary-soft: rgba(66, 184, 131, 0.1);
  --color-secondary: #35495e;
  --color-bg: #1a1a2e;
  --color-text: #ffffff;
  --color-text-muted: #94a3b8;
  --color-error: #ef4444;
  --color-error-soft: rgba(239, 68, 68, 0.1);
  --color-border: #334155;
  --color-input-bg: #1e293b;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, $background-color 0%, #16213e 100%);
  color: $text-color;
  min-height: 100vh;
}

#app {
  width: 100%;
  min-height: 100vh;
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
