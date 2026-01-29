import type { Meta, StoryObj } from '@storybook/vue3';
import Checkbox from './Checkbox.vue';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: false,
    label: 'Checkbox Label',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    modelValue: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    modelValue: true,
    label: 'Disabled Checked',
  },
};
