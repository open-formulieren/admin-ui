import type {Mock} from '@vitest/spy';
import {HttpResponse, http} from 'msw';

import {SESSION_EXPIRES_IN_HEADER} from '@/guard/session/session-expiry';
import type {Theme} from '@/types/theme';

import {BASE_URL_V2} from './base';

const DEFAULT_THEMES: Theme[] = [
  {
    name: 'Light theme',
    uuid: 'f01dc38e-3668-48fa-8963-b6b6e2a9ed6d',
    url: `${BASE_URL_V2}themes/f01dc38e-3668-48fa-8963-b6b6e2a9ed6d`,
  },
  {
    name: 'Dark theme',
    uuid: '3f2176b0-adf3-4b6e-a233-93578fac4166',
    url: `${BASE_URL_V2}themes/3f2176b0-adf3-4b6e-a233-93578fac4166`,
  },
];

export const mockThemesGet = (spy?: Mock) =>
  http.get(
    `${BASE_URL_V2}themes`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(DEFAULT_THEMES, {
        headers: {
          [SESSION_EXPIRES_IN_HEADER]: `3600`, // Set the session expiry to 1 hour
        },
        status: 200,
      });
    },
    {once: false}
  );
