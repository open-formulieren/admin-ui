import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent, within} from 'storybook/test';

import {withFormik} from '@/sb-decorators';

import Select from './Select';

export default {
  title: 'Internal API / Form / Select',
  component: Select,
  decorators: [withFormik],
  args: {
    name: 'select',
    label: 'Select label',
    options: [
      {
        label: 'Option 1',
        value: 'option-1',
      },
      {
        label: 'Option 2',
        value: 'option-2',
      },
    ],
  },
  parameters: {
    formik: {
      initialValues: {
        select: '',
      },
    },
  },
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    isRequired: true,
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Select description',
  },
};

export const WithInitialValue: Story = {
  parameters: {
    formik: {
      initialValues: {
        select: 'option-1',
      },
    },
  },
};

export const SelectSingleValue: Story = {
  parameters: {
    formik: {
      initialValues: {
        select: '',
      },
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const selectInput = canvas.getByLabelText('Select label');

    // There is nothing selected just yet
    expect(canvas.queryAllByText('Option 1')).toHaveLength(0);

    // Open the floating select menu, and select option
    await userEvent.click(selectInput, {delay: 10});
    await userEvent.click(await canvas.findByText('Option 1'));

    // There should now be 2 elements with the text 'Option 1'
    const selectedOption = canvas.getAllByText('Option 1');
    expect(selectedOption).toHaveLength(2);

    // The HTML option is present, and there is a visible label of the selected option.
    expect(selectedOption[0]).toHaveRole('option');
    expect(selectedOption[0]).not.toBeVisible();
    expect(selectedOption[1]).toBeVisible();
  },
};

export const SelectMultipleValues: Story = {
  parameters: {
    formik: {
      initialValues: {
        select: [],
      },
    },
  },
  args: {
    isMulti: true,
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const selectInput = canvas.getByLabelText('Select label');

    // Open the floating select menu
    await userEvent.click(selectInput, {delay: 10});

    // Select options
    await userEvent.click(await canvas.findByText('Option 1'));
    await userEvent.click(await canvas.findByText('Option 2'));

    // Remove focus from select input, closing the floating menu
    await userEvent.tab();

    // Expect the option pills with 'remove' buttons to be visible
    expect(canvas.getByRole('button', {name: 'Remove Option 1'})).toBeVisible();
    expect(canvas.getByRole('button', {name: 'Remove Option 2'})).toBeVisible();
  },
};

export const WithError: Story = {
  parameters: {
    formik: {
      initialErrors: {
        select: 'Invalid!',
      },
      initialTouched: {
        select: true,
      },
    },
  },
};
