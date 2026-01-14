import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';

import BasicLayout from '@/components/layout/BasicLayout';

const SimplePageContent = () => (
  <div>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua.
  </div>
);

export default {
  title: 'Internal API / Layout / Basic Layout',
  component: BasicLayout,
  parameters: {
    layout: 'fullscreen',
    reactRouter: reactRouterParameters({
      routing: {
        id: 'home',
        path: '/admin-ui',
        Component: BasicLayout,
        children: [
          {
            id: 'example page',
            path: 'example-page',
            Component: SimplePageContent,
          },
        ],
      },
    }),
  },
  decorators: [withRouter],
} satisfies Meta<typeof BasicLayout>;

type Story = StoryObj<typeof BasicLayout>;

export const Default: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/admin-ui',
      },
    }),
  },
};

export const WithPageContent: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/admin-ui/example-page',
      },
    }),
  },
};
