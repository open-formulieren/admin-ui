import {Button} from '@maykin-ui/admin-ui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {Field, Form} from 'formik';
import {expect, fn, userEvent, waitFor, within} from 'storybook/test';

import {buildForm, mockFormDetailsGet, mockFormDetailsPut} from '@/api-mocks/form';
import {withFormLayout} from '@/sb-decorators';

// @TODO we should replace the Formik Field component with our own form inputs
const FormPageContent: React.FC = () => {
  return (
    <Form>
      <div>
        <label htmlFor="form-name">Form name</label>
        <Field id="form-name" name="name" autoComplete="false" />
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
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

    await userEvent.click(await canvas.findByText('Submit'));
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
