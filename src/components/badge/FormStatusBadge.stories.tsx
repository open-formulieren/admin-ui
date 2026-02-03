import type {Meta, StoryObj} from '@storybook/react-vite';

import FormStatusBadge from './FormStatusBadge';

export default {
  title: 'Internal API / Badge / Form Status Badge',
  component: FormStatusBadge,
  args: {
    status: 'active',
  },
} satisfies Meta<typeof FormStatusBadge>;

type Story = StoryObj<typeof FormStatusBadge>;

export const Default: Story = {};

export const InInactiveMode: Story = {
  args: {
    status: 'inactive',
  },
};

export const InMaintenanceMode: Story = {
  args: {
    status: 'maintenance',
  },
};

export const InScheduledMode: Story = {
  args: {
    status: 'scheduled',
  },
};
