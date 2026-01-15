import type {IntlShape} from 'react-intl';
import type {
  IndexRouteObject as RRIndexRouteObject,
  NonIndexRouteObject as RRNonIndexRouteObject,
} from 'react-router';

export interface RouteHandle {
  breadcrumbLabel?: (intlShape: IntlShape, loaderData: unknown) => string;
}

type IndexRouteObject = Omit<RRIndexRouteObject, 'handle'> & {
  handle?: RouteHandle;
};

type NonIndexRouteObject = Omit<RRNonIndexRouteObject, 'handle children'> & {
  handle?: RouteHandle;
  children?: RouteObject[];
};

export type RouteObject = IndexRouteObject | NonIndexRouteObject;
