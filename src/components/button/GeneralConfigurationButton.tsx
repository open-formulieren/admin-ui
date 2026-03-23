import {ButtonLink, Outline} from '@maykin-ui/admin-ui';
import {FormattedMessage} from 'react-intl';

import {useAdminSettings} from '@/hooks/useAdminSettings';

const GeneralConfigurationButton = () => {
  const {djangoUrls} = useAdminSettings();

  return (
    <ButtonLink variant="secondary" href={djangoUrls.generalConfiguration}>
      <FormattedMessage
        description="General configuration button text"
        defaultMessage="View general configuration"
      />
      <Outline.ArrowRightIcon />
    </ButtonLink>
  );
};

export default GeneralConfigurationButton;
