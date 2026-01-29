import type { Meta, StoryObj } from '@storybook/vue3';
import ColorPicker from './ColorPicker.vue';

const meta = {
  title: 'UI/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: '#ff0000',
    label: 'Background Color',
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Pick a color for the background',
    modelValue: '#00ff00',
  },
};

export const ErrorState: Story = {
  args: {
    error: 'Invalid color selected',
    modelValue: '#0000ff',
  },
};
