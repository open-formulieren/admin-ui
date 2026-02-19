import {Formik} from 'formik';
import {Outlet, useLoaderData} from 'react-router';

import {queryClient, useFormMutation} from '@/queryClient';
import type {Form} from '@/types/form';

/**
 * React-router layout component for fetching and handling Form details
 *
 * The layout component fetches form details from the router loader, and handles form
 * submissions using the tanstack useMutation. The actual Formik part is handled in a
 * separated FormLayoutInner component, to simplify the setup and testing.
 */
const FormLayout = () => {
  const form = useLoaderData<Form>();
  const {mutate} = useFormMutation(queryClient, form.uuid);

  const handleSubmit = (formDetails: Form) => {
    mutate(formDetails);
  };

  return (
    <FormLayoutInner initialValues={form} onSubmit={handleSubmit}>
      <Outlet />
    </FormLayoutInner>
  );
};

export interface FormLayoutInnerProps {
  initialValues: Form;
  onSubmit: (formData: Form) => void;
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
  <Formik<Form>
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

export default FormLayout;
