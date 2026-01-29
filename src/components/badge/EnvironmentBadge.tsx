import {Badge} from '@maykin-ui/admin-ui';

import {useAdminSettings} from '@/hooks/useAdminSettings';

import './EnvironmentBadge.scss';

const EnvironmentBadge = () => {
  const {environment} = useAdminSettings();

  return <Badge className="mykn-badge openforms-environment-badge">{environment}</Badge>;
};

export default EnvironmentBadge;
