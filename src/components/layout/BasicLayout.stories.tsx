import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';

import BasicLayout from '@/components/layout/BasicLayout';
import type {RouteHandle} from '@/routes/types';
import {withAdminSettingsProvider} from '@/sb-decorators';

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
  },
  decorators: [withRouter, withAdminSettingsProvider],
} satisfies Meta<typeof BasicLayout>;

type Story = StoryObj<typeof BasicLayout>;

export const Default: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/admin-ui',
      },
      routing: {
        path: '/admin-ui',
        handle: {
          breadcrumbLabel: () => 'home',
        },
        Component: BasicLayout,
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
      routing: {
        path: '/admin-ui',
        handle: {
          breadcrumbLabel: () => 'home',
        },
        Component: BasicLayout,
        children: [
          // Page content is shown within the basic layout
          {
            path: 'example-page',
            Component: SimplePageContent,
            handle: {
              breadcrumbLabel: () => 'example-page',
            },
          },
        ],
      },
    }),
  },
};

export const WithDynamicBreadcrumbs: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/admin-ui/dynamic-page',
      },
      routing: {
        path: '/admin-ui',
        handle: {
          // Simple static breadcrumb label
          breadcrumbLabel: () => 'home',
        },
        Component: BasicLayout,
        children: [
          {
            path: 'dynamic-page',
            Component: SimplePageContent,
            // Simulate loading data from some source
            loader: () => ({
              name: 'dynamic page breadcrumb label',
            }),
            // Use the loaded data for the breadcrumb label
            handle: {
              breadcrumbLabel: (_, data: {name: string}) => data.name,
            } satisfies RouteHandle,
          },
        ],
      },
    }),
  },
};
