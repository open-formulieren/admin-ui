import type {Decorator} from '@storybook/react-vite';
import {IntlProvider} from 'react-intl';

import AdminSettingsProvider from '@/context/AdminSettingsProvider';

import {reactIntl} from './reactIntl';

export const withAdminSettingsProvider: Decorator = (Story, {parameters}) => (
  <AdminSettingsProvider environment={parameters?.adminSettings?.environment ?? 'storybook-test'}>
    <Story />
  </AdminSettingsProvider>
);

export const withIntl: Decorator = (Story, context) => {
  const locale: keyof typeof reactIntl.messages = context.globals.locale ?? reactIntl.defaultLocale;

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={reactIntl.defaultLocale}
      messages={reactIntl.messages[locale]}
      formats={reactIntl.formats}
    >
      <Story />
    </IntlProvider>
  );
};
