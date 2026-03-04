import {createState} from 'state-pool';

const SESSION_EXPIRES_IN_HEADER = 'X-Session-Expires-In';

type ActiveSessionExpiry = {
  date: Date;
  numSeconds: number;
  authFailure: boolean;
};

type UnsetSessionExpiry = {
  date: null;
  numSeconds: null;
  authFailure: null;
};

type SessionExpiry = ActiveSessionExpiry | UnsetSessionExpiry;

const sessionExpiresAt = createState<SessionExpiry>({
  date: null,
  numSeconds: null,
  authFailure: null,
});

/**
 * Function to update the session expiry date and auth failure status.
 *
 * Should only be called from within the onResponseHook.
 *
 * @param seconds The number of seconds until the session expires.
 * @param authFailed Whether the authentication failed.
 */
const updateSessionExpiry = (seconds: number, authFailed = false) => {
  const newExpiry = new Date();
  newExpiry.setSeconds(newExpiry.getSeconds() + seconds);
  sessionExpiresAt.updateValue(expiry => {
    expiry.date = newExpiry;
    expiry.numSeconds = seconds;
    expiry.authFailure = authFailed;
  });
};

/**
 * Debounce a function call.
 *
 * @param func The function to debounce.
 * @param delay The debounce delay in milliseconds.
 */
const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const debouncedUpdate = debounce(updateSessionExpiry, 200);

/**
 * HTTP response hook to update the session expiry date and auth failure status.
 *
 * Should be used on all API calls to the backend to keep the session expiry date and
 * auth failure status up to date.
 *
 * @param response The HTTP response object.
 */
const onResponseHook = (response: Response) => {
  const sessionExpiry = response.headers.get(SESSION_EXPIRES_IN_HEADER);
  if (sessionExpiry) {
    const numSeconds = parseInt(sessionExpiry, 10);
    const authFailed = response.status === 401;
    debouncedUpdate(numSeconds, authFailed);
  }
};

export {SESSION_EXPIRES_IN_HEADER, sessionExpiresAt, onResponseHook};
