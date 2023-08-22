import { MethodType } from '@commercetools/sdk-client-v2';
import { handleErrorResponse } from './handleErrorResponse';

describe('handleErrorResponse', () => {
  it('should throw an error with the correct error message', () => {
    const error = new Error('Test Error');
    expect(() => handleErrorResponse(error)).toThrowError('Test Error');
  });

  it('should return the correct error message when given an instance of ClientResponse with an error object', () => {
    const error = {
      body: {
        statusCode: 500,
        message: 'Internal Server Error',
      },
      error: {
        name: 'HttpError',
        message: 'An error occurred',
        code: 500,
        status: 500,
        statusCode: 500,
        originalRequest: {
          method: 'GET' as MethodType,
        },
      },
    };
    expect(() => handleErrorResponse(error)).toThrow('Something went wrong on our side. Please try again later');
  });

  it('should return default error message when given an unknown error status code', () => {
    const error = {
      body: {
        statusCode: 999,
        message: 'Unknown Error',
      },
      error: {
        name: 'UnknownError',
        message: 'An error occurred',
        code: 999,
        status: 999,
        statusCode: 999,
        originalRequest: {
          method: 'GET' as MethodType,
        },
      },
    };
    expect(() => handleErrorResponse(error)).toThrow('An unexpected error occurred');
  });
});
