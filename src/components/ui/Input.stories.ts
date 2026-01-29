import type { Meta, StoryObj } from '@storybook/vue3';
import Input from './Input.vue';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'password', 'email', 'number', 'tel', 'url'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'text' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: '',
    placeholder: 'Enter text...',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Username',
    modelValue: 'invalid-user',
    error: 'This username is already taken',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    modelValue: 'Cannot edit this',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Readonly Input',
    modelValue: 'Read only value',
    readonly: true,
  },
};
