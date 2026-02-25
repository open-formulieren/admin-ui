import '@maykin-ui/admin-ui/style';
import '@maykin-ui/admin-ui/style/themes/black-night.css';
import '@maykin-ui/admin-ui/style/themes/purple-haze.css';
import type {Preview} from '@storybook/react-vite';
import {initialize, mswLoader} from 'msw-storybook-addon';

import {withAdminSettingsProvider} from '@/sb-decorators';

import {reactIntl} from './reactIntl';

initialize({
  onUnhandledRequest: 'bypass',
  quiet: true, // don't output logs
});

const preview: Preview = {
  decorators: [withAdminSettingsProvider],
  loaders: [mswLoader],
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
