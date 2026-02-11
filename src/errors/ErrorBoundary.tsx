import type React from 'react';
import {useRouteError} from 'react-router';

import ErrorDisplay from '@/errors/ErrorDisplay';
import type {AnyError} from '@/errors/exceptions';

const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as AnyError;

  return <ErrorDisplay error={error} />;
};

export default ErrorBoundary;
