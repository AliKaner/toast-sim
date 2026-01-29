<script setup lang="ts">
import Toast from './Toast.vue'
import { useToastStore } from '../../stores/useToastStore'
import { POSITION_OPTIONS } from '../../constants/notification'
import type { Position } from '../../types/notification'

const toastStore = useToastStore()

const positions = POSITION_OPTIONS.map((p) => p.value) as Position[]

function getPositionClasses(position: Position): string {
  const classes = ['toast-list']

  if (position.includes('top')) {
    classes.push('toast-list--top')
  } else {
    classes.push('toast-list--bottom')
  }

  if (position.includes('center')) {
    classes.push('toast-list--center')
  } else if (position.includes('left')) {
    classes.push('toast-list--left')
  } else {
    classes.push('toast-list--right')
  }

  return classes.join(' ')
}

function handleClose(id: string) {
  toastStore.removeNotification(id)
}
</script>

<template>
  <Teleport to="body">
    <div v-for="position in positions" :key="position" :class="getPositionClasses(position)">
      <TransitionGroup name="toast-anim">
        <Toast
          v-for="notification in toastStore.notificationsByPosition[position]"
          :key="notification.id"
          :notification="notification"
          :class="[
            'toast-item',
            `toast-item--${position.includes('left') ? 'left' : position.includes('center') ? 'center' : 'right'}`,
            `anim-${notification.animation}`
          ]"
          @close="handleClose"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-list {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  pointer-events: none;
}

.toast-list > :deep(*) {
  pointer-events: auto;
}

.toast-list--top {
  top: 0;
  flex-direction: column;
}

.toast-list--bottom {
  bottom: 0;
  flex-direction: column-reverse;
}

.toast-list--left {
  left: 0;
}

.toast-list--right {
  right: 0;
}

.toast-list--center {
  left: 50%;
  transform: translateX(-50%);
}

.toast-anim-enter-active,
.toast-anim-leave-active {
  transition: all 0.4s ease;
}

.anim-fade.toast-anim-enter-from,
.anim-fade.toast-anim-leave-to {
  opacity: 0;
}

.anim-bounce.toast-anim-enter-active {
  animation: bounce-in 0.5s;
}
.anim-bounce.toast-anim-leave-active {
  animation: bounce-in 0.5s reverse;
}

.toast-item--right.anim-slide.toast-anim-enter-active {
  animation: slide-in-right 0.4s ease-out;
}
.toast-item--right.anim-slide.toast-anim-leave-active {
  animation: slide-in-right 0.4s ease-in reverse;
}

.toast-item--left.anim-slide.toast-anim-enter-active {
  animation: slide-in-left 0.4s ease-out;
}

.toast-item--left.anim-slide.toast-anim-leave-active {
  animation: slide-in-left 0.4s ease-in reverse;
}

.toast-item--center.anim-slide.toast-anim-enter-active {
  animation: slide-in-top 0.4s ease-out;
}
.toast-item--center.anim-slide.toast-anim-leave-active {
  animation: slide-in-top 0.4s ease-in reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-top {
  from {
    transform: translateY(-1.25rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
