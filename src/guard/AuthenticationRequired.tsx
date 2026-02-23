import {useLocation} from 'react-router';

import {useAdminSettings} from '@/hooks/useAdminSettings';
import {apiCall} from '@/utils/fetch';
import {redirect} from '@/utils/redirect';

import SessionStatus from './session/SessionStatus';
import {sessionExpiresAt} from './session/session-expiry';

const AuthenticationRequired: React.FC<React.PropsWithChildren> = ({children}) => {
  const {apiBaseUrl} = useAdminSettings();
  const location = useLocation();
  const [sessionExpiry] = sessionExpiresAt.useState();
  const {date, authFailure} = sessionExpiry;

  // If there is no session expiry date and no authenticated status,
  // we check with the api if the user is authenticated.
  if (date === null && authFailure === null) {
    apiCall(`${apiBaseUrl}accounts/me`).then(response => {
      // If the user is not authenticated, redirect to the login page.
      if (response.status === 401) {
        redirect.toLogin(location.pathname);
      }
    });
  }

  return (
    <>
      <SessionStatus />
      {children}
    </>
  );
};

export default AuthenticationRequired;
