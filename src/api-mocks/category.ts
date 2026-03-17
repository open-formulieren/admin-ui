import type {Mock} from '@vitest/spy';
import {HttpResponse, http} from 'msw';

import {BASE_URL} from '@/api-mocks/base';
import {SESSION_EXPIRES_IN_HEADER} from '@/guard/session/session-expiry';
import type {Category} from '@/types/category';

const DEFAULT_CATEGORIES: Category[] = [
  {
    url: 'http://localhost:8000/api/v2/categories/c37708ed-3d30-4eac-934f-74bb75256694',
    name: 'Express forms',
    uuid: 'c37708ed-3d30-4eac-934f-74bb75256694',
    ancestors: [],
    depth: 1,
  },
  {
    url: 'http://localhost:8000/api/v2/categories/fed0a451-341a-4da1-b384-83edb5ef67a4',
    name: 'Service realms',
    uuid: 'fed0a451-341a-4da1-b384-83edb5ef67a4',
    ancestors: [],
    depth: 1,
  },
  {
    url: 'http://localhost:8000/api/v2/categories/5d1138ae-bb0c-42fe-bcba-f1e7ffc1e79e',
    name: 'Housing',
    uuid: '5d1138ae-bb0c-42fe-bcba-f1e7ffc1e79e',
    ancestors: [
      {
        uuid: 'fed0a451-341a-4da1-b384-83edb5ef67a4',
        name: 'Service realms',
      },
    ],
    depth: 2,
  },
  {
    url: 'http://localhost:8000/api/v2/categories/d65f420d-1d6a-483d-b5e8-7ddf1d6b60b6',
    name: 'Moving',
    uuid: 'd65f420d-1d6a-483d-b5e8-7ddf1d6b60b6',
    ancestors: [
      {
        uuid: 'fed0a451-341a-4da1-b384-83edb5ef67a4',
        name: 'Service realms',
      },
      {
        uuid: '5d1138ae-bb0c-42fe-bcba-f1e7ffc1e79e',
        name: 'Housing',
      },
    ],
    depth: 3,
  },
  {
    url: 'http://localhost:8000/api/v2/categories/4b626aa4-00ce-4738-aa51-184a95b1f895',
    name: 'Family',
    uuid: '4b626aa4-00ce-4738-aa51-184a95b1f895',
    ancestors: [
      {
        uuid: 'fed0a451-341a-4da1-b384-83edb5ef67a4',
        name: 'Service realms',
      },
    ],
    depth: 2,
  },
];

export const mockCategoriesGet = (spy?: Mock) =>
  http.get(
    `${BASE_URL}v2/categories`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(DEFAULT_CATEGORIES, {
        headers: {
          [SESSION_EXPIRES_IN_HEADER]: `3600`, // Set the session expiry to 1 hour
        },
        status: 200,
      });
    },
    {once: false}
  );
