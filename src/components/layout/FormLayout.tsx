import {Button, Outline, Toolbar} from '@maykin-ui/admin-ui';
import {Formik, useFormikContext} from 'formik';
import {FormattedMessage} from 'react-intl';
import {Outlet, useParams} from 'react-router';

import {queryClient, useFormMutation, useFormQuery} from '@/queryClient';
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
  const {formId} = useParams();
  const form = useFormQuery(queryClient, formId!);
  const {mutate} = useFormMutation(queryClient, formId!);

  const handleSubmit = (formDetails: InternalForm) => {
    mutate(formDetails);
  };

  // Should never happen, as the React-router loader should then trigger a 404.
  // Included to satisfy TypeScript and catch any potential bugs.
  if (!form) {
    return null;
  }

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
    enableReinitialize
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
