import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';

import routes from '@/routes/form';

import FormDetailMenu from './FormDetailMenu';

export default {
  title: 'Internal API / Menu / Form Detail Menu',
  decorators: [withRouter],
  component: FormDetailMenu,
  parameters: {
    controls: {disable: true},
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
            children: routes,
          },
        ],
      },
    }),
  },
} satisfies Meta<typeof FormDetailMenu>;

type Story = StoryObj<typeof FormDetailMenu>;

export const Default: Story = {};
