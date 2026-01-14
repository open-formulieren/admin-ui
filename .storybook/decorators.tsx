import type {Decorator} from '@storybook/react-vite';

import AdminSettingsProvider from '@/context/AdminSettingsProvider';

export const withAdminSettingsProvider: Decorator = (Story, {parameters}) => (
  <AdminSettingsProvider environment={parameters?.adminSettings?.environment ?? 'storybook-test'}>
    <Story />
  </AdminSettingsProvider>
);
