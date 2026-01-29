import type { Meta, StoryObj } from '@storybook/vue3'
import Segment from './Segment.vue'

const meta = {
  title: 'UI/Segment',
  component: Segment,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    'onUpdate:modelValue': { action: 'update:modelValue' }
  },
  args: {
    modelValue: 'opt1',
    label: 'Choose Option',
    options: [
      { text: 'Option 1', value: 'opt1' },
      { text: 'Option 2', value: 'opt2' },
      { text: 'Option 3', value: 'opt3' }
    ]
  }
} satisfies Meta<typeof Segment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Segment'
  }
}
