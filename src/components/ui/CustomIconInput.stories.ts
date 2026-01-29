import type { Meta, StoryObj } from '@storybook/vue3';
import CustomIconInput from './CustomIconInput.vue';

const meta = {
  title: 'UI/CustomIconInput',
  component: CustomIconInput,
  tags: ['autodocs'],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
    'onError': { action: 'error' },
  },
  args: {
    modelValue: '',
    label: 'Custom Icon',
    placeholder: 'Paste SVG here...',
  },
} satisfies Meta<typeof CustomIconInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    modelValue: '<svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>',
  },
};
