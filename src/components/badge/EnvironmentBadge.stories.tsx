import type {Meta, StoryObj} from '@storybook/react-vite';

import EnvironmentBadge from '@/components/badge/EnvironmentBadge';

export default {
  title: 'Internal API / Badge / Environment Badge',
  component: EnvironmentBadge,
} satisfies Meta<typeof EnvironmentBadge>;

type Story = StoryObj<typeof EnvironmentBadge>;

export const Default: Story = {};
