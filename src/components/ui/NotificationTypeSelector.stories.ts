import type { Meta, StoryObj } from '@storybook/vue3'
import NotificationTypeSelector from './NotificationTypeSelector.vue'

const meta = {
  title: 'UI/NotificationTypeSelector',
  component: NotificationTypeSelector,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    hasCustomIcon: { control: 'boolean' }
  },
  args: {
    modelValue: 'success',
    label: 'Notification Type'
  }
} satisfies Meta<typeof NotificationTypeSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCustomIcon: Story = {
  args: {
    hasCustomIcon: true
  }
}
