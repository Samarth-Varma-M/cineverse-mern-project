import { ApiException } from './apiException.js';
import { ValidationException } from './validationException.js';

export const ErrorHandler = {
  handle: (error) => {
    if (error instanceof ValidationException) {
      console.warn('Validation Error:', error.message, error.fields);
      alert(`Validation Error: ${error.message}`);
    } else if (error instanceof ApiException) {
      console.error(`API Error [${error.status}]:`, error.message);
      alert(`Network Error: ${error.message}`);
    } else {
      console.error('Unexpected Error:', error);
      alert(`An unexpected error occurred: ${error.message || 'Unknown error'}`);
    }
  },

  /**
   * Wraps an async function with try-catch and returns the [error, result] tuple.
   * Useful for avoiding multiple nested try-catch blocks.
   */
  asyncWrapper: async (promise) => {
    try {
      const data = await promise;
      return [null, data];
    } catch (error) {
      return [error, null];
    }
  }
};
