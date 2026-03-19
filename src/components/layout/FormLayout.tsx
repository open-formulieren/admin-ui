import {Button, Outline, Toolbar} from '@maykin-ui/admin-ui';
import {Formik, useFormikContext} from 'formik';
import {FormattedMessage} from 'react-intl';
import {Outlet, useLoaderData} from 'react-router';

import {queryClient, useFormMutation} from '@/queryClient';
import type {InternalForm} from '@/types/form';

import BasicLayout from './BasicLayout';

/**
 * React-router layout component for fetching and handling Form details
 *
 * The layout component fetches form details from the router loader, and handles form
 * submissions using the tanstack useMutation. The actual Formik part is handled in a
 * separated FormLayoutInner component, to simplify the setup and testing.
 */
const FormLayout = () => {
  const form = useLoaderData<InternalForm>();
  const {mutate} = useFormMutation(queryClient, form.uuid);

  const handleSubmit = (formDetails: InternalForm) => {
    mutate(formDetails);
  };

  return (
    <FormLayoutInner initialValues={form} onSubmit={handleSubmit}>
      <BasicLayout footer={<FormLayoutFooter />}>
        <Outlet />
      </BasicLayout>
    </FormLayoutInner>
  );
};

export interface FormLayoutInnerProps {
  initialValues: InternalForm;
  onSubmit: (formData: InternalForm) => void;
}

/**
 * Inner working of the FormLayout component, handling the Formik setup.
 *
 * A simple inner component which takes initial form values and submission handlers as
 * properties.
 */
export const FormLayoutInner: React.FC<React.PropsWithChildren<FormLayoutInnerProps>> = ({
  initialValues,
  onSubmit,
  children,
}) => (
  <Formik<InternalForm>
    initialValues={initialValues}
    validateOnChange={false}
    validateOnBlur={false}
    onSubmit={async values => {
      await onSubmit(values);
    }}
  >
    {children}
  </Formik>
);

const FormLayoutFooter: React.FC = () => {
  const {submitForm} = useFormikContext();

  const togglePreview = () => {
    // @TODO
    alert('Preview not yet implemented');
  };

  return (
    <Toolbar
      pad
      variant="alt"
      align="start"
      items={[
        <Button
          key="save-button"
          variant="primary"
          type="button"
          onClick={async e => {
            e.preventDefault();
            await submitForm();
          }}
        >
          <Outline.BookmarkSquareIcon />
          <FormattedMessage description="Save button text" defaultMessage="Save" />
        </Button>,
        <Button key="preview-button" variant="secondary" onClick={togglePreview}>
          <Outline.EyeIcon />
          <FormattedMessage description="Preview button text" defaultMessage="Preview" />
        </Button>,
      ]}
    />
  );
};

export default FormLayout;
