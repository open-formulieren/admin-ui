import '@maykin-ui/admin-ui/style';
import '@maykin-ui/admin-ui/style/themes/black-night.css';
import '@maykin-ui/admin-ui/style/themes/purple-haze.css';
import type {Preview} from '@storybook/react-vite';

import {withAdminSettingsProvider} from '@/sb-decorators';

import {reactIntl} from './reactIntl';

const preview: Preview = {
  decorators: [withAdminSettingsProvider],
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
