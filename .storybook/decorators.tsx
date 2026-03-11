import {Button} from '@maykin-ui/admin-ui';
import type {Decorator} from '@storybook/react-vite';
import {Form, Formik} from 'formik';
import {RouterProvider, createMemoryRouter} from 'react-router';
import {fn} from 'storybook/test';

import {BASE_URL, mswWorker} from '@/api-mocks';
import AdminSettingsProvider from '@/context/AdminSettingsProvider';
import {sessionExpiresAt} from '@/guard/session/session-expiry';

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
 * A decorator that sets up MSW handlers before creating the React Router.
 *
 * When requests are performed using the React-router loader, the regular WithRouter
 * initializes the msw handlers after the loader request. This decorator ensures that the
 * MSW handlers are registered before the router is created.
 */
export const withMswRouter: Decorator = (_, context) => {
  const storyHandlers = context.parameters?.msw?.handlers ?? [];
  const reactRouter = context.parameters?.reactRouter ?? {};

  // Register story handlers BEFORE router is created
  if (storyHandlers.length > 0) {
    mswWorker.use(...storyHandlers);
  }

  const router = createMemoryRouter([reactRouter.routing], {
    initialEntries: [reactRouter.location.path ?? '/'],
  });

  return <RouterProvider router={router} />;
};
