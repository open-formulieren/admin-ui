import type {Option} from '@maykin-ui/admin-ui';
import {ErrorMessage, RadioGroup} from '@maykin-ui/admin-ui';
import {useField, useFormikContext} from 'formik';
import {useId} from 'react';

import FormField from '../FormField';
import Label from '../Label';

export interface RadioFieldProps {
  /**
   * The name of the form field/input, used to set/track the field value in the form state.
   */
  name: string;
  /**
   * The (accessible) label for the field - anything that can be rendered.
   *
   * You must always provide a label to ensure the field is accessible to users of
   * assistive technologies.
   */
  label: React.ReactNode;
  /**
   * Required fields get additional markup/styling to indicate this validation requirement.
   */
  isRequired?: boolean;
  /**
   * The options for the radio group.
   */
  options: Option[];
}

const RadioField: React.FC<RadioFieldProps> = ({name, label, options, isRequired = false}) => {
  const {validateField} = useFormikContext();
  const [{...props}, {error = '', touched}] = useField(name);
  const id = useId();

  const invalid = touched && !!error;
  const errorMessageId = invalid ? `${id}-error-message` : undefined;

  return (
    <FormField>
      <Label id={id} isRequired={isRequired}>
        {label}
      </Label>

      {invalid && <ErrorMessage id={errorMessageId}>{error}</ErrorMessage>}
      <RadioGroup
        aria-labelledby={id}
        aria-describedby={errorMessageId}
        aria-invalid={invalid}
        required={isRequired}
        {...props}
        options={options}
        onBlur={async event => {
          props.onBlur(event);
          await validateField(name);
        }}
      />
    </FormField>
  );
};

export default RadioField;
