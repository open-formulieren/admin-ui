import {Label as MyknLabel} from '@maykin-ui/admin-ui';
import {FormattedMessage} from 'react-intl';

import './Label.scss';

export interface LabelProps {
  id: string;
  isRequired?: boolean;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({id, isRequired, children}) => {
  return (
    <MyknLabel className="mykn-label mykn-label--bold openforms-label" htmlFor={id}>
      <FormattedMessage
        description="Form field label content/wrapper"
        defaultMessage={`{isRequired, select,
        true {{label} <span>Required</span>}
        other {{label}}
      }`}
        values={{
          label: children,
          isRequired,
          span: chunks => <span className="openforms-label__required-indicator">{chunks}</span>,
        }}
      />
    </MyknLabel>
  );
};

export default Label;
