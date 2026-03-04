import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent, within} from 'storybook/test';

import {withFormik} from '@/sb-decorators';

import TextField from './TextField';

export default {
  title: 'Internal API / Form / TextField',
  component: TextField,
  decorators: [withFormik],
  args: {
    name: 'textfield',
    label: 'Textfield label',
  },
  parameters: {
    formik: {
      initialValues: {
        textfield: '',
      },
    },
  },
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    isRequired: true,
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Textfield description',
  },
  play: ({canvasElement}) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Textfield description')).toBeVisible();
  },
};

export const WithInitialValueAndInteraction: Story = {
  parameters: {
    formik: {
      initialValues: {
        textfield: 'Hypa hypa',
      },
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const textfield = canvas.getByLabelText('Textfield label');

    // Expect the initial value to be set
    expect(textfield).toHaveValue('Hypa hypa');

    // Clear input and type a new value
    await userEvent.clear(textfield);
    await userEvent.type(textfield, 'Dancing like a ninja');

    // Expect the input value to be updated
    expect(textfield).toHaveValue('Dancing like a ninja');
  },
};

export const WithError: Story = {
  parameters: {
    formik: {
      initialErrors: {
        textfield: 'Invalid!',
      },
      initialTouched: {
        textfield: true,
      },
    },
  },
  play: ({canvasElement}) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Invalid!')).toBeVisible();
  },
};
