import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';

import routes from '@/routes';

import MainMenu from './MainMenu';

export default {
  title: 'Internal API / Menu / Main Menu',
  decorators: [withRouter],
  component: MainMenu,
  parameters: {
    controls: {disable: true},
    reactRouter: reactRouterParameters({
      location: {
        path: '/',
      },
      routing: {
        ...routes[0],
        element: <MainMenu align="space-between" direction="v" />,
      },
    }),
  },
} satisfies Meta<typeof MainMenu>;

type Story = StoryObj<typeof MainMenu>;

export const Default: Story = {};
