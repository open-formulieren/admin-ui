import {A, Banner} from '@maykin-ui/admin-ui';
import {useIntl} from 'react-intl';
import {useLocation} from 'react-router';

import ErrorMessage from '@/errors/ErrorMessage';
import type {NotAuthenticatedError} from '@/errors/exceptions';

interface PermissionDeniedErrorProps {
  error: NotAuthenticatedError;
}

const PermissionDeniedError: React.FC<PermissionDeniedErrorProps> = ({error}) => {
  const intl = useIntl();
  const location = useLocation();
  const params = new URLSearchParams({next: location.pathname});

  return (
    <>
      <Banner
        title={intl.formatMessage({
          description: "'Permission denied' error title",
          defaultMessage: 'Authentication problem',
        })}
        description={intl.formatMessage({
          description: "'Permission denied' error message",
          defaultMessage: 'There was an authentication and/or permission problem.',
        })}
        variant="danger"
        withIcon
      />
      <ErrorMessage error={error} />

      <A href={`/admin/login/?${params}`}>Go to the login page</A>
    </>
  );
};

export default PermissionDeniedError;
