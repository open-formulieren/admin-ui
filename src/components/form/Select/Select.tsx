import type {Option} from '@maykin-ui/admin-ui';
import {ErrorMessage, Select as MyknSelect} from '@maykin-ui/admin-ui';
import {useField, useFormikContext} from 'formik';
import {useId} from 'react';

import Description from '../Description';
import FormField from '../FormField';
import Label from '../Label';

export interface SelectProps {
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
   * Available options for the select.
   */
  options: Option[];
  /**
   * Allow multiple options selection or not.
   */
  isMulti?: boolean;
  /**
   * Required fields get additional markup/styling to indicate this validation requirement.
   */
  isRequired?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  description,
  options,
  isMulti = false,
  isRequired = false,
}) => {
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
      <MyknSelect
        value={value}
        {...props}
        id={id}
        options={options}
        aria-invalid={invalid}
        aria-describedby={ariaDescribedBy}
        multiple={isMulti}
        required={isRequired}
        onBlur={async () => {
          await validateField(name);
        }}
      />
    </FormField>
  );
};

export default Select;
