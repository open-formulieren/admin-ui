import {A, Banner, Body} from '@maykin-ui/admin-ui';
import {FormattedMessage, useIntl} from 'react-intl';
import {useLocation} from 'react-router';

import ErrorMessage from './ErrorMessage';
import type {NotAuthenticatedException} from './exceptions';

interface NotAuthenticatedErrorProps {
  error: NotAuthenticatedException;
}

const NotAuthenticatedError: React.FC<NotAuthenticatedErrorProps> = ({error}) => {
  const intl = useIntl();
  const location = useLocation();
  const params = new URLSearchParams({next: location.pathname});

  return (
    <>
      <Banner
        title={intl.formatMessage({
          description: "'Not authenticated' error title",
          defaultMessage: 'Authentication problem',
        })}
        description={intl.formatMessage({
          description: "'Not authenticated' error message",
          defaultMessage: 'There was an authentication problem.',
        })}
        variant="danger"
        withIcon
      />
      <ErrorMessage error={error} />

      <Body>
        <A href={`/admin/login/?${params}`}>
          <FormattedMessage
            description="'Go to login page' link text"
            defaultMessage="Go to the login page"
          />
        </A>
      </Body>
    </>
  );
};

export default NotAuthenticatedError;
