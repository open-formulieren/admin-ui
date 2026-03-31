import {Button, Input, Outline} from '@maykin-ui/admin-ui';
import {useField} from 'formik';
import {useId} from 'react';

import FieldDescription from '@/components/form/FieldDescription';
import FormField from '@/components/form/FormField';
import Label from '@/components/form/Label';
import {useAdminSettings} from '@/hooks/useAdminSettings';

interface UrlFieldProps {
  /**
   * The (accessible) label for the field - anything that can be rendered.
   *
   * You must always provide a label to ensure the field is accessible to users of
   * assistive technologies.
   */
  label: React.ReactNode;
}

const UrlField: React.FC<UrlFieldProps> = ({label}) => {
  const {djangoUrls} = useAdminSettings();
  const [{value: formSlug}] = useField('slug');
  const id = useId();

  const formUrl = formSlug ? `${djangoUrls.publicRoot}${formSlug}` : '';

  return (
    <FormField>
      <FieldDescription>
        <Label id={id}>{label}</Label>
      </FieldDescription>

      <Input
        id={id}
        value={formUrl}
        readOnly
        suffix={
          <Button
            variant="transparent"
            type="button"
            onClick={() => navigator.clipboard.writeText(formUrl)}
          >
            <Outline.Square2StackIcon />
          </Button>
        }
      />
    </FormField>
  );
};

export default UrlField;
