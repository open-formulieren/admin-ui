import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';

import routes from '@/routes';

import Sidebar from './Sidebar';

export default {
  title: 'Internal API / Menu / Sidebar',
  component: Sidebar,
  decorators: [withRouter],
} satisfies Meta<typeof Sidebar>;

type Story = StoryObj<typeof Sidebar>;

export const MainMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/',
      },
      routing: {
        ...routes[0],
        Component: Sidebar,
      },
    }),
  },
};

export const FormDesignMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/forms/123/design',
      },
      routing: {
        ...routes[0],
        Component: Sidebar,
      },
    }),
  },
};

export const FormLogicMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/forms/123/logic',
      },
      routing: {
        ...routes[0],
        Component: Sidebar,
      },
    }),
  },
};

export const FormSettingsMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/forms/123/settings',
      },
      routing: {
        ...routes[0],
        Component: Sidebar,
      },
    }),
  },
};
