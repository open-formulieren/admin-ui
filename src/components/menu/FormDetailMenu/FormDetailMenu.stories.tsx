import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';

import FormDetailMenu from './FormDetailMenu';

export default {
  title: 'Internal API / Menu / Form Detail Menu',
  decorators: [withRouter],
  component: FormDetailMenu,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/forms/123/design',
      },
      routing: {
        id: 'forms',
        path: 'forms',
        element: <FormDetailMenu align="space-between" direction="v" />,
        children: [
          {
            id: 'form-detail',
            path: ':formId',
            children: [
              {
                id: 'form-design',
                path: 'design',
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
            ],
          },
        ],
      },
    }),
  },
} satisfies Meta<typeof FormDetailMenu>;

type Story = StoryObj<typeof FormDetailMenu>;

export const Default: Story = {};
