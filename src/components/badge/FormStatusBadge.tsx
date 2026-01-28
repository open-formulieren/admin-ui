import type {BadgeProps} from '@maykin-ui/admin-ui';
import {Badge} from '@maykin-ui/admin-ui';
import {FormattedMessage, defineMessages} from 'react-intl';

type FormStatus = 'active' | 'inactive' | 'maintenance' | 'planned';

export interface FormStatusBadgeProps {
  status: FormStatus;
}

const STATUS_LABELS = defineMessages<FormStatus>({
  active: {
    description: 'Label for form status "active"',
    defaultMessage: 'Active',
  },
  inactive: {
    description: 'Label for form status "inactive"',
    defaultMessage: 'Inactive',
  },
  maintenance: {
    description: 'Label for form status "maintenance"',
    defaultMessage: 'In maintenance',
  },
  planned: {
    description: 'Label for form status "planned"',
    defaultMessage: 'Planned',
  },
});

const STATUS_BADGE_VARIANTS: Record<FormStatus, BadgeProps['variant']> = {
  active: 'success',
  inactive: 'danger',
  maintenance: 'danger',
  planned: 'warning',
};

const FormStatusBadge: React.FC<FormStatusBadgeProps> = ({status}) => {
  const variant = STATUS_BADGE_VARIANTS[status];
  return (
    <Badge variant={variant}>
      <FormattedMessage {...STATUS_LABELS[status]} />
    </Badge>
  );
};

export default FormStatusBadge;
