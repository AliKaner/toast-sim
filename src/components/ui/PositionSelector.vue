<script setup lang="ts">
import Button from './Button.vue'
import FormItemWrapper from './FormItemWrapper.vue'
import { POSITION_OPTIONS } from '../../constants/notification'
import type { Position } from '../../types/notification'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  modelValue: Position
  label?: string
  name?: string
  id?: string
  testId?: string
  tabindex?: number | string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Position): void
}>()
const labelId = computed(() => (props.id ? `${props.id}-label` : undefined))
</script>

<template>
  <FormItemWrapper :label="label" :label-id="labelId" :id="id">
    <div
      class="position-grid"
      role="radiogroup"
      :id="id"
      :aria-labelledby="labelId"
      :data-testid="testId"
    >
      <Button
        v-for="opt in POSITION_OPTIONS"
        :key="opt.value"
        role="radio"
        :aria-checked="modelValue === opt.value"
        :name="name ? `${name}-${opt.value}` : undefined"
        :id="id ? `${id}-${opt.value}` : undefined"
        :variant="modelValue === opt.value ? 'base' : 'outline'"
        :data-testid="testId ? `${testId}-${opt.value}` : undefined"
        :tabindex="tabindex"
        :text="t(opt.text)"
        @click="emit('update:modelValue', opt.value as Position)"
      />
    </div>
  </FormItemWrapper>
</template>

<style scoped>
.position-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
</style>
