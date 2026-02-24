import type {Meta, StoryObj} from '@storybook/react-vite';
import {withRouter} from 'storybook-addon-remix-react-router';

import NavItem from './NavItem';

export default {
  title: 'Internal API / Menu / Nav Item',
  component: NavItem,
  decorators: [withRouter],
} satisfies Meta<typeof NavItem>;

type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    children: 'Nav label',
    to: '/',
  },
};

export const Active: Story = {
  args: {
    children: 'Nav label',
    isActive: true,
    to: '/',
  },
};
