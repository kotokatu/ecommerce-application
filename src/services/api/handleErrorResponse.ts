import { ErrorResponse } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/sdk-client-v2';

export enum ErrorCodes {
  FailedToFetch = 0,
  Unauthorized = 401,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export const getErrorMessage = (error: ClientResponse<ErrorResponse> | Error) => {
  if (error instanceof Error) {
    return error.message;
  }

  const err = error.error;

  if (err) {
    switch (err.statusCode) {
      case ErrorCodes.Unauthorized:
        return 'Authorization failed. Please try again';
      case ErrorCodes.BadRequest:
        return err.message;
      case ErrorCodes.BadGateway:
      case ErrorCodes.InternalServerError:
      case ErrorCodes.ServiceUnavailable:
        return 'Something went wrong on our side. Please try again later';
      default:
        return 'An unexpected error occurred';
    }
  }
  return 'An unexpected error occurred';
};

export const handleErrorResponse = (error: ClientResponse<ErrorResponse> | Error) => {
  throw new Error(getErrorMessage(error));
};
