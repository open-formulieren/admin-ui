// See https://stackoverflow.com/a/43595110 and https://stackoverflow.com/a/32749533
import type {ErrorResponse} from 'react-router';

class ExtendableError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

class NotAuthenticatedError extends ExtendableError {}

type AnyError = ErrorResponse | ExtendableError | NotAuthenticatedError | string;

export {ExtendableError, NotAuthenticatedError, AnyError};
