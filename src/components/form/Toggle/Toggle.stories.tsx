import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent, within} from 'storybook/test';

import {withFormik} from '@/sb-decorators';

import Toggle from './Toggle';

export default {
  title: 'Internal API / Form / Toggle',
  component: Toggle,
  decorators: [withFormik],
  args: {
    name: 'toggle',
    label: 'Toggle label',
    labelOff: 'off',
  },
  parameters: {
    formik: {
      initialValues: {
        toggle: false,
      },
    },
  },
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};

export const Checked: Story = {
  parameters: {
    formik: {
      initialValues: {
        toggle: true,
      },
    },
  },
};

export const CheckAndUncheck: Story = {
  parameters: {
    formik: {
      initialValues: {
        toggle: false,
      },
    },
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    const toggleInput = canvas.getByLabelText<HTMLInputElement>('Toggle label');
    const toggleLabel = canvas.getByText<HTMLLabelElement>('Toggle label');

    await step('Validate clicking the toggle', async () => {
      // Click the toggle to check the input.
      await userEvent.click(toggleInput, {delay: 10});
      expect(toggleInput.checked).toBe(true);

      // Click the again to uncheck - with delay of 100 so the toggle animation runs smooth.
      await userEvent.click(toggleInput, {delay: 100});
      expect(toggleInput.checked).toBe(false);
    });

    await step('Validate clicking the label', async () => {
      // Click the toggle to check the input.
      await userEvent.click(toggleLabel, {delay: 10});
      expect(toggleInput.checked).toBe(true);

      // Click the again to uncheck - with delay of 100 so the toggle animation runs smooth.
      await userEvent.click(toggleLabel, {delay: 100});
      expect(toggleInput.checked).toBe(false);
    });
  },
};

export const WithError: Story = {
  parameters: {
    formik: {
      initialErrors: {
        toggle: 'Invalid!',
      },
      initialTouched: {
        toggle: true,
      },
    },
  },
};
