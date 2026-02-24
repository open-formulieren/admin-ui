import {FormattedMessage} from 'react-intl';

import type {RouteObject} from './types';

const routes: RouteObject[] = [
  {
    id: 'form-design',
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
        id: 'form-design-introduction-page',
        path: 'introduction-page',
      },
      {
        id: 'form-design-start-page',
        path: 'start-page',
      },
      {
        id: 'form-design-form-steps',
        path: 'form-steps',
      },
      {
        id: 'form-design-confirmation',
        path: 'confirmation',
      },
    ],
  },
  {
    id: 'form-logic',
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
        id: 'form-logic-form-rules',
        path: 'form-rules',
      },
      {
        id: 'form-logic-library',
        path: 'library',
      },
      {
        id: 'form-logic-user-variables',
        path: 'user-variables',
      },
    ],
  },
  {
    id: 'form-settings',
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
        id: 'form-settings-general',
        path: 'general',
      },
      {
        id: 'form-settings-authentication',
        path: 'authentication',
      },
      {
        id: 'form-settings-availability',
        path: 'availability',
      },
      {
        id: 'form-settings-presentation',
        path: 'presentation',
      },
      {
        id: 'form-settings-prefill',
        path: 'prefill',
      },
      {
        id: 'form-settings-variables',
        path: 'variables',
      },
      {
        id: 'form-settings-registration',
        path: 'registration',
      },
      {
        id: 'form-settings-confirmation',
        path: 'confirmation',
      },
      {
        id: 'form-settings-submissions',
        path: 'submissions',
      },
      {
        id: 'form-settings-payment',
        path: 'payment',
      },
      {
        id: 'form-settings-data-removal',
        path: 'data-removal',
      },
      {
        id: 'form-settings-translations',
        path: 'translations',
      },
      {
        id: 'form-settings-history',
        path: 'history',
      },
    ],
  },
];

export default routes;
