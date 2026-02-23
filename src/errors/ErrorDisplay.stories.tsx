import type {Meta, StoryObj} from '@storybook/react-vite';
import {withRouter} from 'storybook-addon-remix-react-router';

import {NotAuthenticatedError as NotAuthenticatedException} from '@/errors/exceptions';

import ErrorDisplay from './ErrorDisplay';

export default {
  title: 'Internal API / Error Display',
  component: ErrorDisplay,
  decorators: [withRouter],
} satisfies Meta<typeof ErrorDisplay>;

type Story = StoryObj<typeof ErrorDisplay>;

export const GenericError: Story = {
  args: {
    error: 'error',
  },
};

export const NotAuthenticatedError: Story = {
  args: {
    error: new NotAuthenticatedException('You are not logged in!'),
  },
};
