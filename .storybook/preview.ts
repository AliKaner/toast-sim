import type { Preview, VueRenderer } from '@storybook/vue3'
import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import i18n from '../src/i18n';

setup((app) => {
  app.use(createPinia());
  app.use(i18n);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;