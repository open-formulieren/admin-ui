import '@maykin-ui/admin-ui/style';
import '@maykin-ui/admin-ui/style/themes/black-night.css';
import '@maykin-ui/admin-ui/style/themes/purple-haze.css';
import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router';

import AdminSettingsProvider from '@/context/AdminSettingsProvider';
import type {AdminSettings} from '@/context/context';
import routes from '@/routes';

interface AdminUIProps {
  /**
   * Configuration for the Open Forms environment.
   */
  environmentInfo: AdminSettings['environmentInfo'];
}

/**
 * Main component to render the Open Forms Admin UI.
 */
const AdminUI: React.FC<AdminUIProps> = ({environmentInfo}) => {
  const router = createBrowserRouter(routes, {
    basename: '/admin-ui',
  });

  return (
    <React.StrictMode>
      <AdminSettingsProvider environmentInfo={environmentInfo}>
        <RouterProvider router={router} />
      </AdminSettingsProvider>
    </React.StrictMode>
  );
};

export default AdminUI;
