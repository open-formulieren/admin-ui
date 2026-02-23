import {Body} from '@maykin-ui/admin-ui';

import type {AnyError} from './exceptions';

export interface ErrorMessageProps {
  error: AnyError;
}

/**
 * If the error prop is an object and contains a `message` or `data` property,
 * display it with body styling, otherwise render nothing.`
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({error}) => {
  if (typeof error !== 'object') return null;
  if ('message' in error) {
    return <Body>{error.message}</Body>;
  }
  if ('data' in error) {
    return <Body>{error.data}</Body>;
  }
  return null;
};

export default ErrorMessage;
