import type {BreadcrumbItem} from '@maykin-ui/admin-ui';
import {useIntl} from 'react-intl';
import type {UIMatch} from 'react-router';
import {useMatches} from 'react-router';

import type {RouteHandle} from '@/routes/types';

/**
 * Generates breadcrumb items based on the current route matches.
 *
 * Each breadcrumb item includes a label derived from the route `handle.breadcrumbLabel`
 * function and a corresponding `href` from the route `pathname`. handle.breadcrumbLabel
 * is called with an intlShape and the route loaderData. Routes without the
 * handle.breadcrumbLabel function are excluded.
 *
 * @returns An array of breadcrumb items with `label` and `href` properties.
 */
export const useBreadcrumbItems = (): BreadcrumbItem[] => {
  const intl = useIntl();

  // To add type safety, we need to cast the matches from UIMatch<unknown, unknown>[]
  // to UIMatch<unknown, RouteHandle>[].
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  return matches
    .filter(m => !!m?.handle?.breadcrumbLabel)
    .map(m => ({
      label: m.handle.breadcrumbLabel!(intl, m.loaderData),
      href: m.pathname,
    }));
};
