import {IntlProvider} from 'react-intl';
import {createRoutesStub} from 'react-router';
import {waitFor} from 'storybook/test';
import {expect, test, vi} from 'vitest';
import {render} from 'vitest-browser-react';

import {
  BASE_URL,
  mockAccountsMeAnonymousGet,
  mockAccountsMeAuthenticatedGet,
  mswWorker,
} from '@/api-mocks';
import AdminSettingsProvider from '@/context/AdminSettingsProvider';
import RouterErrorBoundary from '@/errors/RouterErrorBoundary';
import {redirect} from '@/utils/redirect';

import AuthenticationRequired from './AuthenticationRequired';
import {sessionExpiresAt} from './session/session-expiry';

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
 * Testing helper function for resetting the session expiry values.
 */
const resetSessionExpiry = () => {
  sessionExpiresAt.setValue({
    date: null,
    numSeconds: null,
    authFailure: null,
  });
};

/**
 * Testing helper function for setting the session expiry date and auth failure status.
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

test('User is authenticated with valid session in application', async () => {
  // User is authenticated and their session will expire after 1 hour
  const seconds = 60 * 60;
  setSessionExpiry(seconds, false);

  // Set up mock api to /accounts/me to return a 200, but we don't expect it to be called
  // as the user is already authenticated.
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAuthenticatedGet(true, spy));

  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: RouterErrorBoundary,
      Component: PageRequiringAuthentication,
    },
  ]);

  // Go to a page which requires authentication and expect it to render successfully
  const {getByText} = await render(
    <Wrapper>
      <Stub initialEntries={['/required-auth']} />
    </Wrapper>
  );
  await expect.element(getByText('User is authenticated!')).toBeVisible();

  // Expect the mock api to NOT have been called
  expect(spy).not.toHaveBeenCalled();
});

test('User has failed authentication status in application', async () => {
  // User is NOT authenticated and their session will expire after 1 hour
  const seconds = 60 * 60;
  setSessionExpiry(seconds, true);

  // Set up mock api to /accounts/me to return a 200, but we don't expect it to be called
  // as the user has an active session.
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAuthenticatedGet(true, spy));

  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: RouterErrorBoundary,
      Component: PageRequiringAuthentication,
    },
  ]);

  // Go to a page which requires authentication
  const {getByText} = await render(
    <Wrapper>
      <Stub initialEntries={['/required-auth']} />
    </Wrapper>
  );

  // Expect the "authentication problem" message to be shown, as the user is not
  // authenticated.
  await expect.element(getByText('There was an authentication problem.')).toBeVisible();
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

test('User is authenticated with an expired session in application', async () => {
  // User is authenticated, but their session has expired
  const seconds = 0;
  setSessionExpiry(seconds, false);

  // Set up mock api to /accounts/me to return a 200, but we don't expect it to be called
  // as the user has a defined session.
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAuthenticatedGet(false, spy));
  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: RouterErrorBoundary,
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
  await expect.element(getByText('There was an authentication problem.')).toBeVisible();
  await expect.element(getByText('Your session has expired.')).toBeVisible();

  // Expect the mock api to NOT have been called
  expect(spy).not.toHaveBeenCalled();
});

test('User is not authenticated in the application, but is authenticated on server', async () => {
  // Set session expiry values to null, simulating a user without an active session.
  resetSessionExpiry();

  // Set up mock api to /accounts/me to return a 200
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAuthenticatedGet(true, spy));

  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: RouterErrorBoundary,
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

test('User is not authenticated in application and not on server', async () => {
  // Set session expiry values to null, simulating a user without an active session.
  resetSessionExpiry();

  // Set up mock api to /accounts/me to return a 401.
  const spy = vi.fn();
  mswWorker.use(mockAccountsMeAnonymousGet(spy));

  const Stub = createRoutesStub([
    {
      path: '/required-auth',
      ErrorBoundary: RouterErrorBoundary,
      Component: PageRequiringAuthentication,
    },
  ]);

  // Go to a page which requires authentication
  await render(
    <Wrapper>
      <Stub initialEntries={['/required-auth']} />
    </Wrapper>
  );

  // Expect the redirect.toLogin function and the mock api to have been called
  await waitFor(() => {
    // The `toLogin` function should be called with the expected redirect path.
    expect(redirect.toLogin).toHaveBeenCalledWith('/required-auth');

    expect(spy).toHaveBeenCalled();
  });
});
