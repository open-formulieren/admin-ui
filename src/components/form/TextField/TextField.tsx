import {ErrorMessage, Input} from '@maykin-ui/admin-ui';
import {useField, useFormikContext} from 'formik';
import {useId} from 'react';

import Description from '../Description';
import FormField from '../FormField';
import Label from '../Label';

export interface TextFieldProps {
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
   * The description for the field - anything that can be rendered.
   */
  description?: React.ReactNode;
  /**
   * Required fields get additional markup/styling to indicate this validation requirement.
   */
  isRequired?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({name, label, description, isRequired = false}) => {
  const {validateField} = useFormikContext();
  const [{value, ...props}, {error = '', touched}] = useField(name);
  const id = useId();

  const invalid = touched && !!error;
  const errorMessageId = invalid ? `${id}-error-message` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;

  const ariaDescribedBy = [descriptionId, errorMessageId].filter(Boolean).join(' ') || undefined;

  return (
    <FormField>
      <Label id={id} isRequired={isRequired}>
        {label}
      </Label>
      {descriptionId && <Description id={descriptionId}>{description}</Description>}

      {invalid && <ErrorMessage id={errorMessageId}>{error}</ErrorMessage>}
      <Input
        id={id}
        aria-invalid={invalid}
        aria-describedby={ariaDescribedBy}
        required={isRequired}
        value={value ?? ''}
        {...props}
        onBlur={async event => {
          props.onBlur(event);
          await validateField(name);
        }}
      />
    </FormField>
  );
};

export default TextField;
