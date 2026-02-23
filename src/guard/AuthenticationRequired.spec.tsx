import {IntlProvider} from 'react-intl';
import {createRoutesStub} from 'react-router';
import {waitFor} from 'storybook/test';
import {expect, it, vi} from 'vitest';
import {render} from 'vitest-browser-react';

import {
  BASE_URL,
  mockAccountsMeAuthenticatedGet,
  mockAccountsMeNotAuthenticatedGet,
  mswWorker,
} from '@/api-mocks';
import AdminSettingsProvider from '@/context/AdminSettingsProvider';
import ErrorBoundary from '@/errors/ErrorBoundary';
import AuthenticationRequired from '@/guard/AuthenticationRequired';
import {sessionExpiresAt} from '@/guard/session/session-expiry';
import {redirect} from '@/utils/redirect';

// Mock the `toLogin` function
vi.spyOn(redirect, 'toLogin').mockImplementation(vi.fn());

const Wrapper: React.FC<React.PropsWithChildren> = ({children}) => (
  <AdminSettingsProvider apiBaseUrl={BASE_URL} environmentInfo={{label: 'of-dev', showBadge: true}}>
    <IntlProvider locale="en">{children}</IntlProvider>
  </AdminSettingsProvider>
);

const PageRequiringAuthentication: React.FC = () => (
  <AuthenticationRequired>
    <div>User is authenticated!</div>
  </AuthenticationRequired>
);

/**
 * Resets the session expiry date, numSeconds, and authFailure to null.
 */
const resetSessionExpiry = () => {
  sessionExpiresAt.setValue({
    date: null,
    numSeconds: null,
    authFailure: null,
  });
};

/**
 * Sets the session expiry date to the current time plus the given number of seconds.
 */
const setSessionExpiry = (seconds: number, authFailure: boolean = false) => {
  const newExpiry = new Date();
  newExpiry.setSeconds(newExpiry.getSeconds() + seconds);
  sessionExpiresAt.setValue({
    date: newExpiry,
    numSeconds: seconds,
    authFailure: authFailure,
  });
};

it('User is authenticated with valid session in application', async () => {
  // Session will expire after 1 hour
  const seconds = 60 * 60;
  setSessionExpiry(seconds);

  // Setup mock api to return a 200, but we don't expect it to be called.
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAuthenticatedGet(true, spy));

  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: ErrorBoundary,
      Component: PageRequiringAuthentication,
    },
  ]);

  // Go to a page which requires authentication, and expect it to render successfully
  const {getByText} = await render(
    <Wrapper>
      <Stub initialEntries={['/required-auth']} />
    </Wrapper>
  );
  await expect.element(getByText('User is authenticated!')).toBeVisible();

  // Expect the mock api to NOT have been called
  expect(spy).not.toHaveBeenCalled();
});

it('User has failed authentication status in application', async () => {
  // Session will expire after 1 hour
  const seconds = 60 * 60;
  setSessionExpiry(seconds, true);

  // Setup mock api to return a 200, but we don't expect it to be called.
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAuthenticatedGet(true, spy));

  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: ErrorBoundary,
      Component: PageRequiringAuthentication,
    },
  ]);

  // Go to a page which requires authentication
  const {getByText} = await render(
    <Wrapper>
      <Stub initialEntries={['/required-auth']} />
    </Wrapper>
  );

  // Expect the "authentication problem" message to be shown.
  await expect
    .element(getByText('There was an authentication and/or permission problem.'))
    .toBeVisible();
  await expect
    .element(
      getByText(
        "Sorry, we couldn't do that because you are logged out - this may be because your session expired."
      )
    )
    .toBeVisible();

  // Expect the mock api to NOT have been called
  expect(spy).not.toHaveBeenCalled();
});

it('User is authenticated with an expired session in application', async () => {
  // Session has expired
  const seconds = 0;
  setSessionExpiry(seconds, false);

  // Setup mock api to return a 200
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAuthenticatedGet(false, spy));
  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: ErrorBoundary,
      Component: PageRequiringAuthentication,
    },
  ]);

  // Go to a page which requires authentication
  const {getByText} = await render(
    <Wrapper>
      <Stub initialEntries={['/required-auth']} />
    </Wrapper>
  );

  // Expect the "session expired" message to be shown.
  await expect
    .element(getByText('There was an authentication and/or permission problem.'))
    .toBeVisible();
  await expect.element(getByText('Your session has expired.')).toBeVisible();

  // Expect the mock api to NOT have been called
  expect(spy).not.toHaveBeenCalled();
});

it('User is not authenticated in the application, but is authenticated on server', async () => {
  resetSessionExpiry();

  // Setup mock api to return a 200
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAuthenticatedGet(true, spy));

  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: ErrorBoundary,
      Component: PageRequiringAuthentication,
    },
  ]);

  // Expect the page to render successfully
  const {getByText} = await render(
    <Wrapper>
      <Stub initialEntries={['/required-auth']} />
    </Wrapper>
  );
  await expect.element(getByText('User is authenticated!')).toBeVisible();

  // Expect the mock api to have been called
  await waitFor(() => expect(spy).toHaveBeenCalled());
});

it('User is not authenticated in application and not on server', async () => {
  resetSessionExpiry();

  // Setup mock api to return a 401
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeNotAuthenticatedGet(spy));

  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: ErrorBoundary,
      Component: PageRequiringAuthentication,
    },
  ]);

  // Expect to be redirected to the login page
  await render(
    <Wrapper>
      <Stub initialEntries={['/required-auth']} />
    </Wrapper>
  );

  // Expect the redirect.toLogin function and the mock api to have been called
  await waitFor(() => {
    expect(redirect.toLogin).toHaveBeenCalledWith('/required-auth');

    expect(spy).toHaveBeenCalled();
  });
});
