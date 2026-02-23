import type {Mock} from '@vitest/spy';
import {HttpResponse, http} from 'msw';

import {SessionExpiresInHeader} from '@/guard/session/session-expiry';

import {BASE_URL} from './base';

/**
 * Mock a 200 response from the api/v3/accounts/me endpoint.
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
            [SessionExpiresInHeader]: '1000',
          },
          status: 200,
        }
      );
    },
    {once: false}
  );

/**
 * Mock a 401 response from the api/v3/accounts/me endpoint.
 *
 * @param spy An optional spy function to call with the request info. vi.fn() should be
 * used to create the spy.
 */
export const mockAccountsMeNotAuthenticatedGet = (spy?: Mock) =>
  http.get(
    `${BASE_URL}accounts/me`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(undefined, {
        headers: {
          [SessionExpiresInHeader]: '1000',
        },
        status: 401,
      });
    },
    {once: false}
  );
