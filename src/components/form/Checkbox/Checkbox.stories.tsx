import type {Meta, StoryObj} from '@storybook/react-vite';

import {withFormik} from '@/sb-decorators';

import Checkbox from './Checkbox';

export default {
  title: 'Internal API / Form / Checkbox',
  component: Checkbox,
  decorators: [withFormik],
  args: {
    name: 'checkbox',
    label: 'Checkbox label',
  },
  parameters: {
    formik: {
      initialValues: {
        checkbox: false,
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  parameters: {
    formik: {
      initialValues: {
        checkbox: true,
      },
    },
  },
};

export const WithError: Story = {
  parameters: {
    formik: {
      initialErrors: {
        checkbox: 'Invalid!',
      },
      initialTouched: {
        checkbox: true,
      },
    },
  },
};
