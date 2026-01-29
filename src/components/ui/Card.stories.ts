import type { Meta, StoryObj } from '@storybook/vue3';
import Card from './Card.vue';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    label: 'Card Title',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <p style="color: var(--color-text);">This is the card content.</p>
      </Card>
    `,
  }),
};

export const WithHeaderAction: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <template #header>
          <button style="background: none; border: 1px solid var(--color-border); padding: 4px 8px; border-radius: 4px; cursor: pointer; color: var(--color-text);">Action</button>
        </template>
        <p style="color: var(--color-text);">Card with header action.</p>
      </Card>
    `,
  }),
};
