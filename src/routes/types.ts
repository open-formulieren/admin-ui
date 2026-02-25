import type {IntlShape} from 'react-intl';
import type {
  IndexRouteObject as RRIndexRouteObject,
  NonIndexRouteObject as RRNonIndexRouteObject,
} from 'react-router';

export interface RouteHandle<T> {
  breadcrumbLabel?: (intl: IntlShape, loaderData: T) => string;
}

/**
 * Override the react-router IndexRouteObject type to add type specification to the
 * 'handle' property.
 *
 * The React-router IndexRouteObject defines 'handle' with the type 'any'. Because we
 * know what our handlers should look like, we can override this type to ensure that the
 * 'handle' property is typed correctly.
 */
type IndexRouteObject = Omit<RRIndexRouteObject, 'handle'> & {
  handle?: RouteHandle<unknown>;
};

/**
 * Override the react-router NonIndexRouteObject type to add type specification to the
 * 'handle' property.
 *
 * The React-router NonIndexRouteObject defines 'handle' with the type 'any'. Because we
 * know what our handlers should look like, we can override this type to ensure that the
 * 'handle' property is typed correctly.
 *
 * The react-router types also define 'children' with the type 'RouteObject' (which is a
 * union of the react-router IndexRouteObject and NonIndexRouteObject), causing the
 * 'children' routes to also have a 'handle' property with the type 'any'.
 * By overriding this type, we can ensure that the 'handle' property is typed correctly
 * for all routes.
 */
type NonIndexRouteObject = Omit<RRNonIndexRouteObject, 'handle' | 'children'> & {
  handle?: RouteHandle<unknown>;
  children?: RouteObject[];
};

/**
 * Manually defining the union type for the `RouteObject` type to add type specification
 * to the `handle` property.
 *
 * The react-router types specify `handle` with the type `any`, with no way to further
 * specify this. This removes a lot of type safety. We have to manually specify the type
 * here to ensure that the `handle` property is typed correctly.
 *
 * This type should be used in favor of `RouteObject` in react-router routes.
 */
export type RouteObject = IndexRouteObject | NonIndexRouteObject;
