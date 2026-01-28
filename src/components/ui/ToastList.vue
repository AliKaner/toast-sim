<script setup lang="ts">
import { computed } from 'vue'
import Toast from './Toast.vue'
import { useToastStore } from '../../composables/useToastStore'
import type { Position } from '../../types/notification'

interface ToastListProps {
  position?: Position
}

const props = withDefaults(defineProps<ToastListProps>(), {
  position: 'top-right'
})

const toastStore = useToastStore()

const notifications = computed(() => {
  return toastStore.notificationsByPosition[props.position]
})

const positionClasses = computed(() => {
  const classes = ['toast-list']
  
  if (props.position.includes('top')) {
    classes.push('toast-list--top')
  } else {
    classes.push('toast-list--bottom')
  }
  
  if (props.position.includes('left')) {
    classes.push('toast-list--left')
  } else {
    classes.push('toast-list--right')
  }
  
  return classes.join(' ')
})

function handleClose(id: string) {
  toastStore.removeNotification(id)
}
</script>

<template>
  <Teleport to="body">
    <div :class="positionClasses">
      <TransitionGroup name="toast">
        <Toast
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
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
  gap: 12px;
  padding: 16px;
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

/* Transition animations */
.toast-enter-active {
  animation: toast-enter 0.3s ease-out;
}

.toast-leave-active {
  animation: toast-leave 0.3s ease-in;
}

.toast-move {
  transition: transform 0.3s ease;
}

@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toast-leave {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* Left position animations */
.toast-list--left .toast-enter-active {
  animation: toast-enter-left 0.3s ease-out;
}

.toast-list--left .toast-leave-active {
  animation: toast-leave-left 0.3s ease-in;
}

@keyframes toast-enter-left {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toast-leave-left {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>
