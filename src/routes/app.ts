import type {RouteObject} from 'react-router';

import formRoutes from './form';

const routes: RouteObject[] = [
  // All other routes, point back to old admin
  {
    path: 'forms',
    children: [
      {
        path: 'categories',
      },
      {
        path: 'form',
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
