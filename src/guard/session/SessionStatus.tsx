import {useIntl} from 'react-intl';

import ErrorDisplay from '@/errors/ErrorDisplay';
import type {AnyError} from '@/errors/exceptions';
import {NotAuthenticatedException} from '@/errors/exceptions';

import {sessionExpiresAt} from './session-expiry';

interface SessionStatusProps {
  children: React.ReactNode;
}

const SessionStatus: React.FC<SessionStatusProps> = ({children}) => {
  const intl = useIntl();
  const [sessionExpiry] = sessionExpiresAt.useState();
  const {date, authFailure} = sessionExpiry;
  const now = new Date();

  const isExpired = date && now >= date;
  let error: AnyError | undefined;

  if (authFailure) {
    error = new NotAuthenticatedException(
      intl.formatMessage({
        description: 'Session expiry notice - API call failed with 401',
        defaultMessage:
          "Sorry, we couldn't do that because you are logged out - this may be because your session expired.",
      })
    );
  } else if (isExpired) {
    error = new NotAuthenticatedException(
      intl.formatMessage({
        description: 'Session expiry notice - expired',
        defaultMessage: 'Your session has expired.',
      })
    );
  }

  return error ? <ErrorDisplay error={error} /> : children;
};

export default SessionStatus;
