import type {Decorator} from '@storybook/react-vite';

import {BASE_URL} from '@/api-mocks';
import AdminSettingsProvider from '@/context/AdminSettingsProvider';

export const withAdminSettingsProvider: Decorator = (Story, {parameters}) => (
  <AdminSettingsProvider
    apiBaseUrl={parameters?.adminSettings?.apiBaseUrl ?? BASE_URL}
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
