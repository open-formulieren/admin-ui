import {ErrorMessage, Toggle as MyknToggle} from '@maykin-ui/admin-ui';
import {useField, useFormikContext} from 'formik';
import {useId} from 'react';

import FormField from '../FormField';

export interface ToggleProps {
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
   * If defined overwrite default 'off'/'uit' text on the toggle
   */
  labelOff?: string;
}

const Toggle: React.FC<ToggleProps> = ({name, label, isRequired, labelOff}) => {
  const {validateField} = useFormikContext();

  // the value should not be passed down to underlying checkbox
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{value, ...props}, {error = '', touched}] = useField<boolean | undefined>({
    name,
    type: 'checkbox',
  });
  const id = useId();

  const invalid = touched && !!error;
  const errorMessageId = invalid ? `${id}-error-message` : undefined;

  return (
    <FormField>
      {invalid && <ErrorMessage id={errorMessageId}>{error}</ErrorMessage>}
      <MyknToggle
        id={id}
        aria-invalid={invalid}
        aria-describedby={errorMessageId}
        required={isRequired}
        {...props}
        onBlur={async e => {
          props.onBlur(e);
          await validateField(name);
        }}
        labelOff={labelOff}
      >
        {label}
      </MyknToggle>
    </FormField>
  );
};

export default Toggle;
