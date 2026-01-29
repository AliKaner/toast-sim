import type { Meta, StoryObj } from '@storybook/vue3'
import DurationSlider from './DurationSlider.vue'

const meta = {
  title: 'UI/DurationSlider',
  component: DurationSlider,
  tags: ['autodocs'],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
    'onUpdate:checkboxValue': { action: 'update:checkboxValue' }
  },
  args: {
    modelValue: 3,
    min: 1,
    max: 10,
    label: 'Duration (s)',
    checkboxLabel: 'Persistent',
    checkboxValue: false,
    suffix: 's'
  }
} satisfies Meta<typeof DurationSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Persistent: Story = {
  args: {
    checkboxValue: true,
    disabled: true // Usually disabled when persistent is true in the app logic
  }
}

export const DisabledAll: Story = {
  args: {
    disabled: true,
    checkboxDisabled: true,
    checkboxLabel: 'Cannot change'
  }
}
