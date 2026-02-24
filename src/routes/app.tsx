import {FormattedMessage} from 'react-intl';

import FormLayout from '@/components/layout/FormLayout';
import RouterErrorBoundary from '@/errors/RouterErrorBoundary';
import {formLoader, queryClient} from '@/queryClient';
import type {Form} from '@/types/form';

import {PageId} from './constants';
import formRoutes from './form';
import type {RouteHandle, RouteObject} from './types';

const routes: RouteObject[] = [
  // All other routes, point back to old admin
  {
    id: PageId.HOME,
    path: '/',
    ErrorBoundary: RouterErrorBoundary,
    handle: {
      breadcrumbLabel: () => (
        <FormattedMessage description="Route breadcrumb label for home" defaultMessage="home" />
      ),
    },
    children: [
      {
        id: PageId.FORM_CATEGORIES,
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
        id: PageId.FORM_OVERVIEW,
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
            id: PageId.FORM_DETAIL,
            path: ':formId',
            loader: ({params}) => formLoader(queryClient, params.formId),
            handle: {
              breadcrumbLabel: loaderData => loaderData?.name ?? 'unknown form',
            } as RouteHandle<Form | undefined>,
            Component: FormLayout,
            children: formRoutes,
          },
        ],
      },
      {
        id: PageId.FORM_SUBMISSION_STATISTICS,
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
