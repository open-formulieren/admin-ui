import {Button} from '@maykin-ui/admin-ui';
import type {Decorator} from '@storybook/react-vite';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Form, Formik} from 'formik';
import {RouterProvider, createMemoryRouter} from 'react-router';
import {fn} from 'storybook/test';

import {BASE_URL, mswWorker} from '@/api-mocks';
import FormLayout from '@/components/layout/FormLayout';
import AdminSettingsProvider from '@/context/AdminSettingsProvider';
import RouterErrorBoundary from '@/errors/RouterErrorBoundary';
import {sessionExpiresAt} from '@/guard/session/session-expiry';
import {formLoader} from '@/queryClient';

export const withAdminSettingsProvider: Decorator = (Story, {parameters}) => (
  <AdminSettingsProvider
    apiBaseUrl={parameters?.adminSettings?.apiBaseUrl ?? BASE_URL}
    environmentInfo={{
      label: parameters?.adminSettings?.environmentInfo?.label ?? 'storybook-test',
      showBadge: parameters?.adminSettings?.environmentInfo?.showBadge ?? true,
      backgroundColor: parameters?.adminSettings?.environmentInfo?.backgroundColor,
      foregroundColor: parameters?.adminSettings?.environmentInfo?.foregroundColor,
    }}
  >
    <Story />
  </AdminSettingsProvider>
);

export const withFormik: Decorator = (Story, {parameters}) => {
  const isDisabled = parameters?.formik?.disable ?? false;
  if (isDisabled) {
    return <Story />;
  }
  const initialValues = parameters?.formik?.initialValues || {};
  const initialErrors = parameters?.formik?.initialErrors || {};
  const initialTouched = parameters?.formik?.initialTouched || {};
  const initialStatus = parameters?.formik?.initialStatus;
  const wrapForm = parameters?.formik?.wrapForm ?? true;
  const onSubmit = parameters?.formik?.onSubmit ?? fn();
  const renderSubmitButton = parameters?.formik?.renderSubmitButton ?? false;

  const story = (
    <>
      <Story />
      {renderSubmitButton && (
        <Button variant="primary" type="submit" style={{marginBlockStart: '20px'}}>
          Submit
        </Button>
      )}
    </>
  );

  return (
    <Formik
      initialValues={initialValues}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      initialStatus={initialStatus}
      enableReinitialize
      onSubmit={async values => onSubmit(values)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {wrapForm ? (
        <Form id="storybook-withFormik-decorator-form" data-testid="storybook-formik-form">
          {story}
        </Form>
      ) : (
        story
      )}
    </Formik>
  );
};

export const withSessionExpiry: Decorator = (Story, {parameters}) => {
  sessionExpiresAt.setValue({
    date: parameters?.sessionExpiry?.date ?? null,
    numSeconds: parameters?.sessionExpiry?.numSeconds ?? null,
    authFailure: parameters?.sessionExpiry?.authFailure ?? null,
  });

  return <Story />;
};

/**
 * Decorator for setting up a form detail page with a router and query client. This makes
 * it possible to test form detail pages and submission actions.
 *
 * This simulates a real form detail page, using the formLoader to fetch form data.
 *
 * For isolated Formik testing, like testing a singular form field, use the `withFormik`
 * decorator.
 *
 * To capture form submission actions, use the `formDetailPages.onMutate` parameter.
 */
export const withFormLayout: Decorator = (Story, {parameters}) => {
  const storyHandlers = parameters?.msw?.handlers ?? [];
  const onMutate = parameters?.formDetailPages?.onMutate ?? fn();

  // Register story handlers BEFORE router is created
  if (storyHandlers.length > 0) {
    mswWorker.use(...storyHandlers);
  }

  const storybookQueryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        // Capture mutate calls so we can see submission actions
        onMutate: variables => onMutate(variables),
      },
      queries: {retry: false},
    },
  });

  const router = createMemoryRouter(
    [
      {
        path: '/admin-ui',
        ErrorBoundary: RouterErrorBoundary,
        children: [
          {
            path: 'forms/:formId',
            loader: ({params}) => formLoader(storybookQueryClient, params.formId),
            Component: FormLayout,
            children: [
              {
                index: true,
                Component: Story,
              },
            ],
          },
        ],
      },
    ],
    {
      initialEntries: [`/admin-ui/forms/e450890a-4166-410e-8d64-0a54ad30ba01`],
    }
  );

  return (
    <QueryClientProvider client={storybookQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
