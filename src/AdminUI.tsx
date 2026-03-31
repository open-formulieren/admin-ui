import '@maykin-ui/admin-ui/style';
import '@maykin-ui/admin-ui/style/themes/paint-it-black.css';
import '@maykin-ui/admin-ui/style/themes/purple-rain.css';
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
  /**
   * Configuration for the Open Forms API base URLs.
   */
  apiBaseUrls: AdminSettings['apiBaseUrls'];
  /**
   * The configuration of the Open Forms Django URLs.
   *
   * These urls should be constructed using the python `reverse` function to ensure
   * that the urls are correct for the current environment.
   */
  djangoUrls: AdminSettings['djangoUrls'];
}

/**
 * Main component to render the Open Forms Admin UI.
 */
const AdminUI: React.FC<AdminUIProps> = ({environmentInfo, apiBaseUrls, djangoUrls}) => {
  const router = createBrowserRouter(routes, {
    basename: '/admin-ui',
  });

  return (
    <React.StrictMode>
      <AdminSettingsProvider
        environmentInfo={environmentInfo}
        apiBaseUrls={apiBaseUrls}
        djangoUrls={djangoUrls}
      >
        <RouterProvider router={router} />
      </AdminSettingsProvider>
    </React.StrictMode>
  );
};

export default AdminUI;
