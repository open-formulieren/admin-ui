import {FormattedMessage} from 'react-intl';

import formRoutes from './form';
import type {RouteObject} from './types';

const routes: RouteObject[] = [
  // All other routes, point back to old admin
  {
    id: 'home',
    path: '/',
    handle: {
      breadcrumbLabel: () => (
        <FormattedMessage description="Route breadcrumb label for home" defaultMessage="home" />
      ),
    },
    children: [
      {
        id: 'form-categories',
        path: 'form-categories',
        handle: {
          breadcrumbLabel: () => (
            <FormattedMessage
              description="Route breadcrumb label for form categories"
              defaultMessage="categories"
            />
          ),
        },
      },
      {
        id: 'form-overview',
        path: 'forms',
        handle: {
          breadcrumbLabel: () => (
            <FormattedMessage
              description="Route breadcrumb label for forms overview"
              defaultMessage="forms"
            />
          ),
        },
        children: [
          {
            id: 'form-detail',
            path: ':formId',
            handle: {
              breadcrumbLabel: () => {
                // @TODO We should use the name of the form as breadcrumb label.
                // See https://reactrouter.com/6.30.2/hooks/use-matches for example implementation.
                return '[form name]';
              },
            },
            children: formRoutes,
          },
        ],
      },
      {
        id: 'form-submission-statistics',
        path: 'form-submission-statistics',
        handle: {
          breadcrumbLabel: () => (
            <FormattedMessage
              description="Route breadcrumb label for form submission statistics"
              defaultMessage="form submission statistics"
            />
          ),
        },
      },
    ],
  },
];

export default routes;
