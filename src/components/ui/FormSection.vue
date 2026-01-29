<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: string
  id?: string
  name?: string
}

const props = defineProps<Props>()

const sectionId = computed(() => props.id || props.name || crypto.randomUUID())
const labelId = computed(() => `${sectionId.value}-label`)
</script>

<template>
  <div class="form-section" role="group" :aria-labelledby="label ? labelId : undefined">
    <div v-if="label" class="section-label" :id="labelId">
      {{ label }}
    </div>

    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}
</style>
