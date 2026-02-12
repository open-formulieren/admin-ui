import {createState} from 'state-pool';

const SessionExpiresInHeader = 'X-Session-Expires-In';

const sessionExpiresAt = createState<{
  date: Date | null;
  numSeconds: number | null;
  authFailure: boolean | null;
}>({
  date: null,
  numSeconds: null,
  authFailure: null,
});

const updateSessionExpiry = (seconds: number, authFailed = false) => {
  const newExpiry = new Date();
  newExpiry.setSeconds(newExpiry.getSeconds() + seconds);
  sessionExpiresAt.updateValue(expiry => {
    expiry.date = newExpiry;
    expiry.numSeconds = seconds;
    expiry.authFailure = authFailed;
  });
};

const debounce = (func: (...args: unknown[]) => void, timeout: number) => {
  let timer: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const debouncedUpdate = debounce(updateSessionExpiry, 200);

const onResponseHook = (response: Response) => {
  const sessionExpiry = response.headers.get(SessionExpiresInHeader);
  if (sessionExpiry) {
    const numSeconds = parseInt(sessionExpiry, 10);
    const authFailed = response.status === 401;
    debouncedUpdate(numSeconds, authFailed);
  }
};

export {SessionExpiresInHeader, sessionExpiresAt, onResponseHook};
