import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';
import {expect, within} from 'storybook/test';

import {mockAccountsMeAuthenticatedGet} from '@/api-mocks';
import BasicLayout from '@/components/layout/BasicLayout';
import {withSessionExpiry} from '@/sb-decorators';

import AuthenticationRequired from './AuthenticationRequired';

const PageRequiringAuthentication: React.FC = () => (
  <AuthenticationRequired>Hello authenticated user!</AuthenticationRequired>
);

export default {
  title: 'Guards / Authentication Required',
  component: AuthenticationRequired,
  decorators: [withRouter, withSessionExpiry],
  parameters: {
    layout: 'fullscreen',
    reactRouter: reactRouterParameters({
      location: {
        path: '/admin-ui/page-requiring-authentication',
      },
      routing: [
        {
          path: '/admin-ui',
          Component: BasicLayout,
          children: [
            {
              path: 'page-requiring-authentication',
              Component: PageRequiringAuthentication,
            },
          ],
        },
      ],
    }),
  },
} satisfies Meta<typeof AuthenticationRequired>;

type Story = StoryObj<typeof AuthenticationRequired>;

export const Authenticated: Story = {
  parameters: {
    msw: {
      handlers: [mockAccountsMeAuthenticatedGet(true)],
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByText('Hello authenticated user!')).toBeVisible();
  },
};

export const ExpiresSession: Story = {
  parameters: {
    sessionExpiry: {
      // The session expired 1 second ago
      date: new Date().setSeconds(new Date().getSeconds() - 1),
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByText('Your session has expired.')).toBeVisible();
  },
};

export const AuthenticationFailure: Story = {
  parameters: {
    sessionExpiry: {
      // The session will expire in 1 hour, but there was an authentication failure
      date: new Date().setSeconds(new Date().getSeconds() + 3600),
      authFailure: true,
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    expect(
      await canvas.findByText(
        "Sorry, we couldn't do that because you are logged out - this may be because your session expired."
      )
    ).toBeVisible();
  },
};
