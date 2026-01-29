import type { Meta, StoryObj } from '@storybook/vue3'
import Switch from './Switch.vue'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    'onUpdate:modelValue': { action: 'update:modelValue' }
  },
  args: {
    modelValue: false,
    label: 'Enable Feature'
  }
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    modelValue: true
  }
}

export const WithoutLabel: Story = {
  args: {
    label: ''
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Switch'
  }
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    modelValue: true,
    label: 'Disabled Checked'
  }
}
