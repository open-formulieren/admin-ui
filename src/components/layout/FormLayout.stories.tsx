import {Button} from '@maykin-ui/admin-ui';
import type {Decorator, Meta, StoryObj} from '@storybook/react-vite';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Field, Form} from 'formik';
import {RouterProvider, createMemoryRouter} from 'react-router';
import {expect, fn, userEvent, within} from 'storybook/test';

import {mswWorker} from '@/api-mocks';
import {buildForm, mockFormDetailsGet, mockFormDetailsPut} from '@/api-mocks/form';
import FormLayout, {FormLayoutInner} from '@/components/layout/FormLayout';
import {formLoader} from '@/queryClient';

const withFormQueryClientAndRouterProvider: Decorator = (Story, context) => {
  const storyHandlers = context.parameters?.msw?.handlers ?? [];

  // Register story handlers BEFORE router is created
  if (storyHandlers.length > 0) {
    mswWorker.use(...storyHandlers);
  }

  const storybookQueryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false},
    },
  });

  const router = createMemoryRouter(
    [
      {
        path: '/admin-ui/form/:formId',
        loader: ({params}) => formLoader(storybookQueryClient, params.formId),
        Component: FormLayout,
        children: [
          {
            index: true,
            Component: Story, // Story rendered inside the route
          },
        ],
      },
    ],
    {
      initialEntries: ['/admin-ui/form/e450890a-4166-410e-8d64-0a54ad30ba01'],
    }
  );

  return (
    <QueryClientProvider client={storybookQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

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
  component: FormLayout,
} satisfies Meta<typeof FormLayout>;

type FormLayoutInnerStory = StoryObj<typeof FormLayoutInner>;

export const Default: FormLayoutInnerStory = {
  render: args => (
    <FormLayoutInner initialValues={args.initialValues} onSubmit={args.onSubmit}>
      <FormPageContent />
    </FormLayoutInner>
  ),
  args: {
    initialValues: buildForm(),
    onSubmit: fn(),
  },
  play: async ({canvasElement, args}) => {
    const canvas = within(canvasElement);

    const formNameInput = await canvas.findByLabelText('Form name');
    expect(formNameInput).toHaveValue('Mock form');

    // Update the field value
    await userEvent.clear(formNameInput);
    await userEvent.type(formNameInput, 'My awesome form');
    expect(formNameInput).toHaveValue('My awesome form');

    await userEvent.click(await canvas.findByText('Submit'));
    expect(args.onSubmit).toBeCalled();

    const expectedFormDetails = buildForm({name: 'My awesome form'});
    expect(args.onSubmit).toBeCalledWith(expectedFormDetails);
  },
};

type FromRouterStory = StoryObj;

export const FetchingFormDetailsUsingRouteLoader: FromRouterStory = {
  decorators: [withFormQueryClientAndRouterProvider],
  render: () => <FormPageContent />,
  parameters: {
    msw: {
      handlers: [mockFormDetailsGet(buildForm({name: 'Route fetched form'})), mockFormDetailsPut()],
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const formNameInput = await canvas.findByLabelText('Form name');
    expect(formNameInput).toHaveValue('Route fetched form');
  },
};
