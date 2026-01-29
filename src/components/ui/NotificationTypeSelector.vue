<script setup lang="ts">
import NotificationIcon from './NotificationIcon.vue'
import { TYPE_OPTIONS } from '../../constants/notification'
import type { NotificationType } from '../../types/notification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface NotificationTypeSelectorProps {
  modelValue: NotificationType
  hasCustomIcon?: boolean
  name?: string
  id?: string
  testId?: string
  tabindex?: number | string
  label?: string
}

const props = defineProps<NotificationTypeSelectorProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: NotificationType): void
}>()

import FormItemWrapper from './FormItemWrapper.vue'
import { computed } from 'vue';

const labelId = computed(() => props.id ? `${props.id}-label` : undefined);
</script>

<template>
  <FormItemWrapper :label="label" :label-id="labelId" :id="id" no-focus-color>
    <div 
      class="type-selector" 
      role="radiogroup" 
      :id="id"
      :aria-labelledby="labelId"
      :data-testid="testId"
    >
      <button
        v-for="opt in TYPE_OPTIONS"
        :key="opt.value"
        :name="name"
        :class="['type-btn', { active: !hasCustomIcon && modelValue === opt.value }, opt.value]"
        role="radio"
        :aria-checked="!hasCustomIcon && modelValue === opt.value"
        :tabindex="tabindex"
        @click="emit('update:modelValue', opt.value as NotificationType)"
      >
        <div class="type-icon">
          <NotificationIcon :type="opt.value as NotificationType" />
        </div>
        <span class="type-text">{{ t(opt.text) }}</span>
      </button>
    </div>
  </FormItemWrapper>
</template>

<style scoped>
.type-selector {
  display: flex;
  gap: 0.5rem;
}

.type-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem 0.5rem;
  border: 0.125rem solid var(--color-border);
  border-radius: 0.5rem;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-btn.success .type-icon { color: var(--color-success); }
.type-btn.error .type-icon { color: var(--color-error); }
.type-btn.warning .type-icon { color: var(--color-warning); }
.type-btn.info .type-icon { color: var(--color-info); }

.type-btn.active .type-icon { color: var(--color-button-text, #fff); }

.type-btn:hover {
  border-color: var(--color-text-muted);
}

.type-btn.active.success {
  border-color: var(--color-success);
  background: var(--color-success);
  color: var(--color-button-text, #fff);
}

.type-btn.active.error {
  border-color: var(--color-error);
  background: var(--color-error);
  color: var(--color-button-text, #fff);
}

.type-btn.active.warning {
  border-color: var(--color-warning);
  background: var(--color-warning);
  color: var(--color-button-text, #fff);
}

.type-btn.active.info {
  border-color: var(--color-info);
  background: var(--color-info);
  color: var(--color-button-text, #fff);
}

.type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
}

.type-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.type-text {
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 480px) {
  .type-text {
    display: none;
  }
  
  .type-btn {
    padding: 0.5rem;
    gap: 0;
  }
}
</style>
