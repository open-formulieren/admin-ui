import type {Preview} from '@storybook/react-vite';

import {reactIntl} from './reactIntl';

const preview: Preview = {
  parameters: {
    reactIntl,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  initialGlobals: {
    locale: reactIntl.defaultLocale,
    locales: {
      en: 'English',
      nl: 'Nederlands',
    },
  },
};

export default preview;
