import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['base', 'outline'] },
    size: { control: 'select', options: ['default', 'small'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    onClick: { action: 'click' }
  },
  args: {
    text: 'Button Text',
    variant: 'base',
    size: 'default'
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline',
    text: 'Outline Button'
  }
}

export const Small: Story = {
  args: {
    size: 'small',
    text: 'Small Button'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    text: 'Disabled Button'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    text: 'Loading...'
  }
}
