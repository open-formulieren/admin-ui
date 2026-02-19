import {formLoader, queryClient} from '@/queryClient';
import type {Form} from '@/types/form';

import formRoutes from './form';
import type {RouteHandle, RouteObject} from './types';

const routes: RouteObject[] = [
  // All other routes, point back to old admin
  {
    path: '/',
    handle: {
      breadcrumbLabel: intl =>
        intl.formatMessage({
          description: 'Route breadcrumb label for home',
          defaultMessage: 'home',
        }),
    },
    children: [
      {
        path: 'form-categories',
        handle: {
          breadcrumbLabel: intl =>
            intl.formatMessage({
              description: 'Route breadcrumb label for form categories',
              defaultMessage: 'categories',
            }),
        },
      },
      {
        path: 'forms',
        handle: {
          breadcrumbLabel: intl =>
            intl.formatMessage({
              description: 'Route breadcrumb label for forms overview',
              defaultMessage: 'forms',
            }),
        },
        children: [
          {
            path: ':formId',
            loader: ({params}) => formLoader(queryClient, params.formId),
            handle: {
              breadcrumbLabel: (_, loaderData) => loaderData?.name ?? 'unknown form',
            } as RouteHandle<Form | undefined>,
            children: formRoutes,
          },
        ],
      },
      {
        path: 'form-submission-statistics',
        handle: {
          breadcrumbLabel: intl =>
            intl.formatMessage({
              description: 'Route breadcrumb label for form submission statistics',
              defaultMessage: 'form submission statistics',
            }),
        },
      },
    ],
  },
];

export default routes;
