import {useIntl} from 'react-intl';

import {NotAuthenticatedError} from '@/errors/exceptions';

import {sessionExpiresAt} from './session-expiry';

const SessionStatus = () => {
  const intl = useIntl();
  const [sessionExpiry] = sessionExpiresAt.useState();
  const {date, authFailure} = sessionExpiry;
  const now = new Date();

  const isExpired = date && now >= date;

  if (authFailure) {
    throw new NotAuthenticatedError(
      intl.formatMessage({
        description: 'Session expiry notice - API call failed with 401',
        defaultMessage:
          "Sorry, we couldn't do that because you are logged out - this may be because your session expired.",
      })
    );
  } else if (isExpired) {
    throw new NotAuthenticatedError(
      intl.formatMessage({
        description: 'Session expiry notice - expired',
        defaultMessage: 'Your session has expired.',
      })
    );
  }

  return null;
};

export default SessionStatus;
