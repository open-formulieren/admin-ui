import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent, within} from 'storybook/test';

import {withFormik} from '@/sb-decorators';

import RadioField from './RadioField';

export default {
  title: 'Internal API / Form / RadioField',
  component: RadioField,
  decorators: [withFormik],
  args: {
    name: 'radiofield',
    label: 'Radiofield label',
    options: [
      {value: 'coffee', label: 'Coffee'},
      {value: 'tea', label: 'Tea'},
      {value: 'beer', label: 'Beer'},
    ],
  },
  parameters: {
    formik: {
      initialValues: {
        radiofield: '',
      },
    },
  },
} satisfies Meta<typeof RadioField>;

type Story = StoryObj<typeof RadioField>;

export const Default: Story = {
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole('radio');
    await expect(radios).toHaveLength(3);

    await expect(canvas.getByText('Coffee')).toBeVisible();
    await expect(canvas.getByText('Beer')).toBeVisible();

    await step('Select value', async () => {
      await userEvent.click(canvas.getByLabelText('Tea'));
      await expect(radios[1]).toBeChecked();
    });
  },
};

export const Required: Story = {
  args: {
    isRequired: true,
  },
};

export const WithInitialValue: Story = {
  parameters: {
    formik: {
      initialValues: {
        radiofield: 'coffee',
      },
    },
  },
};

export const WithError: Story = {
  parameters: {
    formik: {
      initialErrors: {
        radiofield: 'Invalid!',
      },
      initialTouched: {
        radiofield: true,
      },
    },
  },
};
