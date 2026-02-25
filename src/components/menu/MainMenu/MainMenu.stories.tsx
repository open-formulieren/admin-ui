import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';

import MainMenu from './MainMenu';

export default {
  title: 'Internal API / Menu / Main Menu',
  decorators: [withRouter],
  component: MainMenu,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/',
      },
      routing: {
        id: 'home',
        path: '/',
        element: <MainMenu align="space-between" direction="v" />,
        children: [
          {
            id: 'form-categories',
            path: 'form-categories',
          },
          {
            id: 'form-overview',
            path: 'forms',
          },
          {
            id: 'form-submission-statistics',
            path: 'form-submission-statistics',
          },
        ],
      },
    }),
  },
} satisfies Meta<typeof MainMenu>;

type Story = StoryObj<typeof MainMenu>;

export const Default: Story = {};
