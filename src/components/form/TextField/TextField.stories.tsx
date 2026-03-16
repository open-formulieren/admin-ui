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
  play: ({canvasElement}) => {
    const canvas = within(canvasElement);

    // The field has 'Required' as part of its label content, and the input has
    // the attribute 'required'
    expect(canvas.getByText('Required')).toBeVisible();
    expect(canvas.getByLabelText('Textfield label Required')).toHaveAttribute('required');
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // The input has the accessible 'readonly' attribute
    const textInput = canvas.getByLabelText('Textfield label');
    expect(textInput).toHaveAttribute('readonly');

    // Typing in the input shouldn't change its content
    await userEvent.type(textInput, 'this text should not be added');
    expect(textInput).toHaveTextContent('');
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

export const KitchenSink: Story = {
  args: {
    isRequired: true,
    description: 'Textfield description',
  },
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

    // Expect all textual content to be shown
    expect(canvas.getByText('Required')).toBeVisible();
    expect(canvas.getByText('Textfield description')).toBeVisible();
    expect(canvas.getByText('Invalid!')).toBeVisible();
  },
};
