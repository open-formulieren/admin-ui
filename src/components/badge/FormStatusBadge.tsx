import type {BadgeProps} from '@maykin-ui/admin-ui';
import {Badge} from '@maykin-ui/admin-ui';
import {FormattedMessage, defineMessages} from 'react-intl';

type FormStatus = 'active' | 'inactive' | 'maintenance' | 'scheduled';

export interface FormStatusBadgeProps {
  status: FormStatus;
}

const STATUS_LABELS = defineMessages<FormStatus>({
  active: {
    description: 'Label for form status "active"',
    defaultMessage: 'Active form',
  },
  inactive: {
    description: 'Label for form status "inactive"',
    defaultMessage: 'Inactive form',
  },
  maintenance: {
    description: 'Label for form status "maintenance"',
    defaultMessage: 'Form in maintenance mode',
  },
  scheduled: {
    description: 'Label for form status "scheduled"',
    defaultMessage: 'Scheduled form',
  },
});

const STATUS_BADGE_VARIANTS: Record<FormStatus, BadgeProps['variant']> = {
  active: 'success',
  inactive: 'danger',
  maintenance: 'danger',
  scheduled: 'warning',
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
