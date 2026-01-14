import type {Meta, StoryObj} from '@storybook/react-vite';

import EnvironmentBadge from '@/components/badge/EnvironmentBadge';
import {withAdminSettingsProvider} from '@/sb-decorators';

export default {
  title: 'Internal API / Badge / Environment Badge',
  component: EnvironmentBadge,
  decorators: [withAdminSettingsProvider],
} satisfies Meta<typeof EnvironmentBadge>;

type Story = StoryObj<typeof EnvironmentBadge>;

export const Default: Story = {};
