import type { Meta, StoryObj } from '@storybook/vue3';
import FormSection from './FormSection.vue';

const meta = {
  title: 'UI/FormSection',
  component: FormSection,
  tags: ['autodocs'],
  args: {
    label: 'Section Title',
  },
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { FormSection },
    setup() {
      return { args };
    },
    template: `
      <FormSection v-bind="args">
        <div style="border: 1px dashed var(--color-border); padding: 1rem; color: var(--color-text-muted);">
          Section Content
        </div>
      </FormSection>
    `,
  }),
};

export const WithoutLabel: Story = {
  args: {
    label: '',
  },
  render: (args) => ({
    components: { FormSection },
    setup() {
      return { args };
    },
    template: `
      <FormSection v-bind="args">
        <div style="border: 1px dashed var(--color-border); padding: 1rem; color: var(--color-text-muted);">
          Section Content without label
        </div>
      </FormSection>
    `,
  }),
};
