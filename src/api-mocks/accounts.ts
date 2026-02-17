import type {Mock} from '@vitest/spy';
import {HttpResponse, http} from 'msw';

import {SESSION_EXPIRES_IN_HEADER} from '@/guard/session/session-expiry';

import {BASE_URL} from './base';

/**
 * Mock a request to the api/v3/accounts/me endpoint as an authenticated user, resulting
 * in a 200 response.
 *
 * @param mfaVerified Whether the user is MFA verified or not.
 * @param spy An optional spy function to call with the request info. vi.fn() should be
 * used to create the spy.
 */
export const mockAccountsMeAuthenticatedGet = (mfaVerified: boolean, spy?: Mock) =>
  http.get(
    `${BASE_URL}accounts/me`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(
        {mfaVerified},
        {
          headers: {
            [SESSION_EXPIRES_IN_HEADER]: `3600`, // Set the session expiry to 1 hour
          },
          status: 200,
        }
      );
    },
    {once: false}
  );

/**
 * Mock a request to the api/v3/accounts/me endpoint as an anonymous user, resulting in
 * a 401 response.
 *
 * @param spy An optional spy function to call with the request info. vi.fn() should be
 * used to create the spy.
 */
export const mockAccountsMeAnonymousGet = (spy?: Mock) =>
  http.get(
    `${BASE_URL}accounts/me`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(undefined, {
        headers: {
          [SESSION_EXPIRES_IN_HEADER]: `3600`, // Set the session expiry to 1 hour
        },
        status: 401,
      });
    },
    {once: false}
  );
