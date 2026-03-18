import {Button, Card, Toolbar} from '@maykin-ui/admin-ui';
import {clsx} from 'clsx';
import {useFormikContext} from 'formik';

import type {InternalForm} from '@/types/form';

import './FormButtonsPreview.scss';

export interface FormButtonsPreviewProps {
  className?: string;
}

const FormButtonsPreview: React.FC<FormButtonsPreviewProps> = ({className}) => {
  const {values} = useFormikContext<InternalForm>();
  const {literals, _stepLiterals} = values;

  // @TODO this should be real preview of the form buttons
  // i.e. using the formio-renderer buttons and styling from the selected theme

  return (
    <Card
      border
      className={clsx('openforms-form-buttons-preview', className)}
      data-testid="form-buttons-preview"
    >
      <Toolbar pad className="openforms-form-buttons-preview__toolbar">
        {Object.entries(literals).map(([key, literal]) => (
          <Button key={`form_${key}`} type="button" variant="primary">
            {literal}
          </Button>
        ))}
        {Object.entries(_stepLiterals).map(([key, literal]) => (
          <Button key={`form_step_${key}`} type="button" variant="primary">
            {literal}
          </Button>
        ))}
      </Toolbar>
    </Card>
  );
};

export default FormButtonsPreview;
