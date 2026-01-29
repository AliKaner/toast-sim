import type { Meta, StoryObj } from '@storybook/vue3';
import Slider from './Slider.vue';

const meta = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    hint: { control: 'text' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: 50,
    min: 0,
    max: 100,
    label: 'Volume',
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSuffix: Story = {
  args: {
    suffix: '%',
    label: 'Progress',
  },
};

export const WithHint: Story = {
  args: {
    hint: 'Adjust the volume level',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Slider',
  },
};

export const ErrorState: Story = {
  args: {
    error: 'Invalid value',
  },
};
