import type { Meta, StoryObj } from '@storybook/vue3';
import Toast from './Toast.vue';

const meta = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    'onClose': { action: 'close' },
  },
  args: {
    notification: {
      id: '1',
      type: 'success',
      title: 'Success Notification',
      message: 'This is a success message example.',
      duration: 5,
      position: 'top-right',
      backgroundColor: 'var(--color-success)',
      textColor: '#ffffff',
      showIcon: true,
      showCloseButton: true,
      animation: 'slide',
      customIcon: '',
      createdAt: Date.now(),
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    notification: {
      id: '2',
      type: 'error',
      title: 'Error Occurred',
      message: 'Something went wrong with the operation.',
      duration: 5,
      position: 'top-right',
      backgroundColor: 'var(--color-error)',
      textColor: '#ffffff',
      showIcon: true,
      showCloseButton: true,
      animation: 'slide',
      customIcon: '',
      createdAt: Date.now(),
    },
  },
};

export const Warning: Story = {
  args: {
    notification: {
      id: '3',
      type: 'warning',
      title: 'Warning Alert',
      message: 'Please be careful with this action.',
      duration: 5,
      position: 'top-right',
      backgroundColor: 'var(--color-warning)',
      textColor: '#ffffff',
      showIcon: true,
      showCloseButton: true,
      animation: 'slide',
      customIcon: '',
      createdAt: Date.now(),
    },
  },
};

export const Info: Story = {
  args: {
    notification: {
      id: '4',
      type: 'info',
      title: 'Information',
      message: 'Here is some useful information.',
      duration: 5,
      position: 'top-right',
      backgroundColor: 'var(--color-info)',
      textColor: '#ffffff',
      showIcon: true,
      showCloseButton: true,
      animation: 'slide',
      customIcon: '',
      createdAt: Date.now(),
    },
  },
};

export const Persistent: Story = {
  args: {
    notification: {
      id: '5',
      type: 'success',
      title: 'Persistent Toast',
      message: 'This toast will not close automatically.',
      duration: 0,
      position: 'top-right',
      backgroundColor: 'var(--color-success)',
      textColor: '#ffffff',
      showIcon: true,
      showCloseButton: true,
      animation: 'slide',
      customIcon: '',
      createdAt: Date.now(),
    },
  },
};
