import '@maykin-ui/admin-ui/style';
// @TODO update theme after upgrading admin-ui
import '@maykin-ui/admin-ui/style/themes/purple-rain.css';
import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router';

import AdminSettingsProvider from '@/context/AdminSettingsProvider';
import routes from '@/routes';

interface AdminUIProps {
  /**
   * The environment name of the Open Forms instance.
   */
  environment: string;
}

/**
 * Main component to render the Open Forms Admin UI.
 */
const AdminUI: React.FC<AdminUIProps> = ({environment}) => {
  const router = createBrowserRouter(routes, {
    basename: '/admin-ui',
  });

  return (
    <React.StrictMode>
      <AdminSettingsProvider environment={environment}>
        <RouterProvider router={router} />
      </AdminSettingsProvider>
    </React.StrictMode>
  );
};

export default AdminUI;
