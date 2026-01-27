<script setup lang="ts">
interface Props {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="form-item-wrapper" :class="{ 'has-error': error }">
    <div v-if="label" class="label-container">
      <label class="label">
        {{ label }}
        <span v-if="required" class="required-indicator">*</span>
      </label>
      <span v-if="hint && !error" class="hint">{{ hint }}</span>
    </div>
    
    <div class="input-slot">
      <slot />
    </div>

    <Transition name="fade-slide">
      <span v-if="error" class="error-message">{{ error }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.form-item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1.25rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.25rem;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s ease;
}

.required-indicator {
  color: var(--color-error);
  font-size: 1rem;
}

.hint {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.input-slot {
  position: relative;
  transition: transform 0.2s ease;
}

.form-item-wrapper:focus-within .label {
  color: var(--color-primary);
}

.error-message {
  font-size: 0.8rem;
  color: var(--color-error);
  margin-top: 0.25rem;
  padding-left: 0.25rem;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
