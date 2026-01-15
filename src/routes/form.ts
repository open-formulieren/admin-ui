import type {RouteObject} from 'react-router';

const routes: RouteObject[] = [
  {
    path: 'design',
    children: [
      {
        path: 'introduction-page',
      },
      {
        path: 'start-page',
      },
      {
        path: 'form-steps',
      },
      {
        path: 'confirmation',
      },
    ],
  },
  {
    path: 'logic',
    children: [
      {
        path: 'form-rules',
      },
      {
        path: 'library',
      },
      {
        path: 'user-variables',
      },
    ],
  },
  {
    path: 'settings',
    children: [
      {
        path: 'general',
      },
      {
        path: 'authentication',
      },
      {
        path: 'availability',
      },
      {
        path: 'presentation',
      },
      {
        path: 'prefill',
      },
      {
        path: 'user-variables',
      },
      {
        path: 'registration',
      },
      {
        path: 'confirmation',
      },
      {
        path: 'submissions',
      },
      {
        path: 'payment',
      },
      {
        path: 'data-removal',
      },
      {
        path: 'translations',
      },
      {
        path: 'history',
      },
    ],
  },
];

export default routes;
