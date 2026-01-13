import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router';

import routes from '@/routes';

/**
 * Main component to render the Open Forms Admin UI.
 */
const AdminUI: React.FC = () => {
  const router = createBrowserRouter(routes, {
    basename: '/admin-ui',
  });

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default AdminUI;
