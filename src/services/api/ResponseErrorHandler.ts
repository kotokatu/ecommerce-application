import { ClientResponse } from '@commercetools/sdk-client-v2';

enum ErrorCodes {
  Unauthorized = 401,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export const handleResponseError = (res: ClientResponse) => {
  const err = res.error;
  if (err) {
    switch (err.statusCode) {
      case ErrorCodes.BadRequest:
        throw new Error(err.message);
      case ErrorCodes.BadGateway:
      case ErrorCodes.InternalServerError:
      case ErrorCodes.ServiceUnavailable:
        throw new Error('Something went wrong on our side. Please try again later');
      default:
        throw new Error('An unexpected error occurred');
    }
  }
  throw new Error('An unexpected error occurred');
};
