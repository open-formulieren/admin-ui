import {isRouteErrorResponse} from 'react-router';

import GenericError from './GenericError';
import NotAuthenticatedError from './NotAuthenticatedError';
import type {AnyError} from './exceptions';
import {NotAuthenticatedException} from './exceptions';

export interface ErrorDisplayProps {
  error: AnyError;
}

/**
 * Given the error, look up the appropriate display component and render that, falling
 * back to a generic display if no specific variant is available.
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({error}) => {
  // @TODO errors from react-router, like 404
  if (isRouteErrorResponse(error)) return error.status;

  // handling 401 errors
  if (error instanceof NotAuthenticatedException) {
    return <NotAuthenticatedError error={error} />;
  }

  // fall back to the generic case
  return <GenericError error={error} />;
};

export default ErrorDisplay;
