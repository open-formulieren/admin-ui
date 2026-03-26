import {FormattedMessage} from 'react-intl';

import {PageId} from './constants';
import type {RouteObject} from './types';

const routes: RouteObject[] = [
  {
    id: PageId.FORM_DETAIL_DESIGN,
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
        id: PageId.FORM_DETAIL_DESIGN_INTRODUCTION,
        path: 'introduction-page',
      },
      {
        id: PageId.FORM_DETAIL_DESIGN_START,
        path: 'start-page',
      },
      {
        id: PageId.FORM_DETAIL_DESIGN_FORM_STEPS,
        path: 'form-steps',
      },
      {
        id: PageId.FORM_DETAIL_DESIGN_CONFIRMATION,
        path: 'confirmation',
      },
    ],
  },
  {
    id: PageId.FORM_DETAIL_LOGIC,
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
        id: PageId.FORM_DETAIL_LOGIC_FORM_RULES,
        path: 'form-rules',
      },
      {
        id: PageId.FORM_DETAIL_LOGIC_LIBRARY,
        path: 'library',
      },
      {
        id: PageId.FORM_DETAIL_LOGIC_USER_VARIABLES,
        path: 'user-variables',
      },
    ],
  },
  {
    id: PageId.FORM_DETAIL_SETTINGS,
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
        id: PageId.FORM_DETAIL_SETTINGS_GENERAL,
        path: 'general',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_AUTHENTICATION,
        path: 'authentication',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_AVAILABILITY,
        path: 'availability',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_PRESENTATION,
        path: 'presentation',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_PREFILL,
        path: 'prefill',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_VARIABLES,
        path: 'variables',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_REGISTRATION,
        path: 'registration',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_CONFIRMATION,
        path: 'confirmation',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_SUBMISSIONS,
        path: 'submissions',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_PAYMENT,
        path: 'payment',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_DATA_REMOVAL,
        path: 'data-removal',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_TRANSLATIONS,
        path: 'translations',
      },
      {
        id: PageId.FORM_DETAIL_SETTINGS_HISTORY,
        path: 'history',
      },
    ],
  },
];

export default routes;
