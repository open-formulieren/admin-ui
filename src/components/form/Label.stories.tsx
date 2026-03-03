import type {Meta, StoryObj} from '@storybook/react-vite';

import Label from './Label';

export default {
  title: 'Internal API / Form / Label',
  component: Label,
  args: {
    id: 'some-id',
    children: 'My form field label',
    isRequired: false,
  },
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    isRequired: true,
  },
};

export const JSXLabel: Story = {
  args: {
    children: <i>JSX label</i>,
  },
};
