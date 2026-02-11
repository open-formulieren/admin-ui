import type {Meta, StoryObj} from '@storybook/react-vite';
import {withRouter} from 'storybook-addon-remix-react-router';
import {expect, within} from 'storybook/test';

import ErrorDisplay from './ErrorDisplay';
import {NotAuthenticatedException} from './exceptions';

export default {
  title: 'Internal API / Error Display',
  component: ErrorDisplay,
  decorators: [withRouter],
} satisfies Meta<typeof ErrorDisplay>;

type Story = StoryObj<typeof ErrorDisplay>;

export const StringError: Story = {
  args: {
    error: 'Just a simple string-based error',
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Ensure the error message is shown
    expect(await canvas.findByText('Just a simple string-based error')).toBeVisible();
  },
};

export const GenericError: Story = {
  args: {
    error: new Error('Something went wrong'),
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Ensure the error message is shown
    expect(await canvas.findByText('Something went wrong')).toBeVisible();
  },
};

export const NotAuthenticatedError: Story = {
  args: {
    error: new NotAuthenticatedException('You are not logged in!'),
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // Ensure the error message is shown
    expect(await canvas.findByText('You are not logged in!')).toBeVisible();
    // NotAuthenticated errors should provide a "back to login" link
    expect(await canvas.findByRole('link', {name: 'Go to the login page'})).toBeVisible();
  },
};
