import type React from 'react';
import {useRouteError} from 'react-router';

import ErrorDisplay from './ErrorDisplay';

/**
 * Error boundary for react-router errors.
 *
 * Handles react-router errors like 404's, errors thrown in loaders, etc.
 * Needs to be implemented in the router config as a `ErrorBoundary`, see docs:
 * https://reactrouter.com/how-to/error-boundary#data-mode.
 */
const RouterErrorBoundary: React.FC = () => {
  const error = useRouteError();
  if (!error) return null;

  return <ErrorDisplay error={error} />;
};

export default RouterErrorBoundary;
