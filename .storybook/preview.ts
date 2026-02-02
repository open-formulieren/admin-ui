import '@maykin-ui/admin-ui/style';
// @TODO update theme after upgrading admin-ui
import '@maykin-ui/admin-ui/style/themes/purple-rain.css';
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
