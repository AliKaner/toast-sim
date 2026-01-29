import type { Meta, StoryObj } from '@storybook/vue3';
import TextArea from './TextArea.vue';

const meta = {
  title: 'UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'text' },
    rows: { control: 'number' },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
  },
  args: {
    modelValue: '',
    placeholder: 'Enter your message...',
    label: 'Message',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    modelValue: 'This is some pre-filled text.',
  },
};

export const ErrorState: Story = {
  args: {
    modelValue: 'Invalid input',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'Disabled textarea',
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: 'Readonly content',
  },
};
