import type {Decorator} from '@storybook/react-vite';

import AdminSettingsProvider from '@/context/AdminSettingsProvider';

export const withAdminSettingsProvider: Decorator = (Story, {parameters}) => (
  <AdminSettingsProvider
    apiBaseUrl={parameters?.adminSettings?.apiBaseUrl ?? 'http://localhost:8000/api/v3/'}
    environmentInfo={{
      label: parameters?.adminSettings?.environmentInfo?.label ?? 'storybook-test',
      showBadge: parameters?.adminSettings?.environmentInfo?.showBadge ?? true,
      backgroundColor: parameters?.adminSettings?.environmentInfo?.backgroundColor,
      foregroundColor: parameters?.adminSettings?.environmentInfo?.foregroundColor,
    }}
  >
    <Story />
  </AdminSettingsProvider>
);
