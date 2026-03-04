import {useLayoutEffect} from 'react';
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

  useLayoutEffect(() => {
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
  }, [apiBaseUrl, authFailure, date, location.pathname]);

  return <SessionStatus>{children}</SessionStatus>;
};

export default AuthenticationRequired;
