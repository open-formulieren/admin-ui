import type {RouteObject} from 'react-router';

import formRoutes from './form';

const routes: RouteObject[] = [
  // All other routes, point back to old admin
  {
    path: '/',
    children: [
      {
        path: 'form-categories',
      },
      {
        path: 'forms',
        children: [
          {
            path: ':formId',
            children: formRoutes,
          },
        ],
      },
      {
        path: 'form-submission-statistics',
      },
    ],
  },
];

export default routes;
