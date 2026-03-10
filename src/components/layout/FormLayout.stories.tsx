import type {Meta, StoryObj} from '@storybook/react-vite';
import {Field, Form} from 'formik';
import {expect, fireEvent, fn, userEvent, waitFor, within} from 'storybook/test';

import {buildForm, mockFormDetailsGet, mockFormDetailsPut} from '@/api-mocks/form';
import {withFormLayout} from '@/sb-decorators';

// @TODO we should replace the Formik Field component with our own form inputs
const FormPageContent: React.FC = () => {
  return (
    <Form>
      <label htmlFor="form-name">Form name</label>
      <Field id="form-name" name="name" autoComplete="false" />
    </Form>
  );
};

export default {
  title: 'Internal API / Layout / Form Layout',
  component: FormPageContent,
  decorators: [withFormLayout],
  parameters: {
    layout: 'fullscreen',
    formDetailPages: {
      onMutate: fn(),
    },
  },
} satisfies Meta<typeof FormPageContent>;

type Story = StoryObj<typeof FormPageContent>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [mockFormDetailsGet(buildForm()), mockFormDetailsPut()],
    },
  },
  play: async ({canvasElement, parameters}) => {
    const canvas = within(canvasElement);

    const formNameInput = await canvas.findByLabelText('Form name');
    expect(formNameInput).toHaveValue('Mock form');

    // Update the field value
    await userEvent.clear(formNameInput);
    await userEvent.type(formNameInput, 'My awesome form');
    expect(formNameInput).toHaveValue('My awesome form');

    // Using fireEvent.click instead of userEvent.click because userEvent.click doesn't
    // actually fire a click event, which we need to trigger the form submission.
    await fireEvent.click(canvas.getByRole('button', {name: 'Save'}));

    await waitFor(() => {
      expect(parameters.formDetailPages.onMutate).toBeCalled();

      const expectedFormDetails = buildForm({name: 'My awesome form'});
      expect(parameters.formDetailPages.onMutate).toBeCalledWith(expectedFormDetails);
    });
  },
};

export const FetchingFormDetailsUsingRouteLoader: Story = {
  parameters: {
    msw: {
      handlers: [mockFormDetailsGet(buildForm({name: 'Route fetched form'}))],
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const formNameInput = await canvas.findByLabelText('Form name');
    expect(formNameInput).toHaveValue('Route fetched form');
  },
};
