import {FormattedMessage} from 'react-intl';

import type {RouteObject} from './types';

const routes: RouteObject[] = [
  {
    path: 'design',
    handle: {
      breadcrumbLabel: () => (
        <FormattedMessage
          description="Route breadcrumb label for form detail design"
          defaultMessage="design"
        />
      ),
    },
    children: [
      {
        path: 'introduction-page',
      },
      {
        path: 'start-page',
      },
      {
        path: 'form-steps',
      },
      {
        path: 'confirmation',
      },
    ],
  },
  {
    path: 'logic',
    handle: {
      breadcrumbLabel: () => (
        <FormattedMessage
          description="Route breadcrumb label for form detail logic"
          defaultMessage="logic"
        />
      ),
    },
    children: [
      {
        path: 'form-rules',
      },
      {
        path: 'library',
      },
      {
        path: 'user-variables',
      },
    ],
  },
  {
    path: 'settings',
    handle: {
      breadcrumbLabel: () => (
        <FormattedMessage
          description="Route breadcrumb label for form detail settings"
          defaultMessage="settings"
        />
      ),
    },
    children: [
      {
        path: 'general',
      },
      {
        path: 'authentication',
      },
      {
        path: 'availability',
      },
      {
        path: 'presentation',
      },
      {
        path: 'prefill',
      },
      {
        path: 'user-variables',
      },
      {
        path: 'registration',
      },
      {
        path: 'confirmation',
      },
      {
        path: 'submissions',
      },
      {
        path: 'payment',
      },
      {
        path: 'data-removal',
      },
      {
        path: 'translations',
      },
      {
        path: 'history',
      },
    ],
  },
];

export default routes;
