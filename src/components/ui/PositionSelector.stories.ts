import type { Meta, StoryObj } from '@storybook/vue3';
import PositionSelector from './PositionSelector.vue';
import { POSITION_OPTIONS } from '../../constants/notification';

const meta = {
  title: 'UI/PositionSelector',
  component: PositionSelector,
  tags: ['autodocs'],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: 'top-right',
    label: 'Notification Position',
  },
} satisfies Meta<typeof PositionSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
