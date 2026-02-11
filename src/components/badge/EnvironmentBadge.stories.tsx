import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, within} from 'storybook/test';

import EnvironmentBadge from '@/components/badge/EnvironmentBadge';

export default {
  title: 'Internal API / Badge / Environment Badge',
  component: EnvironmentBadge,
} satisfies Meta<typeof EnvironmentBadge>;

type Story = StoryObj<typeof EnvironmentBadge>;

export const Default: Story = {};

export const WithCustomBackgroundAndForeground: Story = {
  parameters: {
    adminSettings: {
      environmentInfo: {
        backgroundColor: 'limegreen',
        foregroundColor: 'white',
      },
    },
  },
};

export const HideEnvironmentBadge: Story = {
  parameters: {
    adminSettings: {
      environmentInfo: {
        label: 'Env badge',
        showBadge: false,
      },
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByText('Env badge')).not.toBeInTheDocument();
  },
};
