import {Button} from '@maykin-ui/admin-ui';
import {Form, Formik} from 'formik';
import {FormattedMessage} from 'react-intl';

import {TextField} from '@/components/form';
import type {InternalForm} from '@/types/form';

export interface LiteralsFormData {
  literals: InternalForm['literals'];
  _stepLiterals: InternalForm['_stepLiterals'];
}

interface LiteralsFormProps {
  initialValues: LiteralsFormData;
  onSubmit: (formData: LiteralsFormData) => Promise<void> | void;
}

const LiteralsForm: React.FC<LiteralsFormProps> = ({initialValues, onSubmit}) => {
  return (
    <Formik<LiteralsFormData>
      initialValues={initialValues}
      onSubmit={async values => await onSubmit(values)}
    >
      <Form data-testid="literals-form">
        <TextField
          name="literals.begin_text"
          label={
            <FormattedMessage
              description="LiteralsForm field 'literals.begin_text' label"
              defaultMessage="The text that will be displayed at the start of the form to indicate the user can begin to fill in the form"
            />
          }
        />
        <TextField
          name="literals.previous_text"
          label={
            <FormattedMessage
              description="LiteralsForm field 'literals.previous_text' label"
              defaultMessage="The text that will be displayed in the overview page to go to the previous step"
            />
          }
        />
        <TextField
          name="literals.change_text"
          label={
            <FormattedMessage
              description="LiteralsForm field 'literals.change_text' label"
              defaultMessage="The text that will be displayed in the overview page to change a certain step"
            />
          }
        />
        <TextField
          name="literals.confirm_text"
          label={
            <FormattedMessage
              description="LiteralsForm field 'literals.confirm_text' label"
              defaultMessage="The text that will be displayed in the overview page to confirm the form is filled in correctly"
            />
          }
        />
        <TextField
          name="_stepLiterals.next_text"
          label={
            <FormattedMessage
              description="LiteralsForm field '_stepLiterals.next_text' label"
              defaultMessage="The text that will be displayed in the form step to go to the next step"
            />
          }
        />
        <TextField
          name="_stepLiterals.previous_text"
          label={
            <FormattedMessage
              description="LiteralsForm field '_stepLiterals.previous_text' label"
              defaultMessage="The text that will be displayed in the form step to go to the previous step"
            />
          }
        />
        <TextField
          name="_stepLiterals.save_text"
          label={
            <FormattedMessage
              description="LiteralsForm field '_stepLiterals.save_text' label"
              defaultMessage="The text that will be displayed in the form step to save the current information"
            />
          }
        />
        <Button variant="primary" type="submit">
          <FormattedMessage description="LiteralsForm 'Save' button label" defaultMessage="Save" />
        </Button>
      </Form>
    </Formik>
  );
};

export default LiteralsForm;
