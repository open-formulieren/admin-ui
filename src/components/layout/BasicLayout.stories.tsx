import {Toolbar} from '@maykin-ui/admin-ui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';
import {expect, within} from 'storybook/test';

import BasicLayout from '@/components/layout/BasicLayout';
import type {RouteHandle} from '@/routes/types';

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
  decorators: [withRouter],
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
              breadcrumbLabel: (_, data) => data.name,
            } satisfies RouteHandle<{name: string}>,
          },
        ],
      },
    }),
  },
};

export const WithComponentProperties: Story = {
  args: {
    children: <SimplePageContent />,
    footer: (
      <Toolbar
        pad
        variant="alt"
        align="start"
        items={[
          {
            variant: 'primary',
            children: 'Footer action',
          },
        ]}
      />
    ),
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Both the children and footer content should be rendered
    expect(canvas.getByText(/Lorem ipsum dolor sit amet/)).toBeVisible();
    expect(canvas.getByRole('button', {name: 'Footer action'})).toBeVisible();
  },
};
