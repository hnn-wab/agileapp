import { ErrorType } from '../types/error';

export function handleApiError(error: any): ErrorType {
  if (error.status) {
    return {
      type: 'api',
      message: error.message || 'API error',
      status: error.status,
      details: error,
    };
  }
  if (error.name === 'HttpError') {
    return {
      type: 'network',
      message: error.message || 'Network error',
      details: error,
    };
  }
  if (error.name === 'AuthenticationError') {
    return {
      type: 'auth',
      message: error.message || 'Authentication error',
      details: error,
    };
  }
  return {
    type: 'unknown',
    message: error?.message || 'Unknown error',
    details: error,
  };
}
