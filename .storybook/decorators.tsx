import {Button} from '@maykin-ui/admin-ui';
import type {Decorator} from '@storybook/react-vite';
import {Form, Formik} from 'formik';
import {fn} from 'storybook/test';

import {BASE_URL} from '@/api-mocks';
import AdminSettingsProvider from '@/context/AdminSettingsProvider';

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
