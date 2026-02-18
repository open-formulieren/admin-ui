import '@maykin-ui/admin-ui/style';
// @TODO update theme after upgrading admin-ui
import '@maykin-ui/admin-ui/style/themes/purple-rain.css';
import type {Preview} from '@storybook/react-vite';
import {initialize, mswLoader} from 'msw-storybook-addon';

import {withAdminSettingsProvider} from '@/sb-decorators';

import {reactIntl} from './reactIntl';

initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: './mockServiceWorker.js',
  },
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
