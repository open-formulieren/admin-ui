import {Badge} from '@maykin-ui/admin-ui';

import {useAdminSettings} from '@/hooks/useAdminSettings';

const EnvironmentBadge = () => {
  const {environmentInfo} = useAdminSettings();
  const {label, showBadge, backgroundColor, foregroundColor} = environmentInfo;

  if (!showBadge) return null;

  return (
    <Badge
      style={{
        '--mykn-badge-color-background': backgroundColor ?? '#e8a600',
        '--mykn-badge-color-text': foregroundColor ?? '#333333',
      }}
    >
      {label}
    </Badge>
  );
};

export default EnvironmentBadge;
