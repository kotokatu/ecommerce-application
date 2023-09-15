import { storeService } from '../../services/StoreService/StoreService';

export enum ErrorCodes {
  FailedToFetch = 0,
  Unauthorized = 401,
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export const getErrorMessage = (errorResponse: unknown) => {
  if (errorResponse && typeof errorResponse === 'object' && 'body' in errorResponse) {
    const error = errorResponse.body;

    if (error && typeof error === 'object' && 'statusCode' in error && 'message' in error) {
      switch (error.statusCode) {
        case ErrorCodes.Unauthorized:
        case ErrorCodes.Forbidden:
          storeService.logoutUser();
          window.location.reload();
          break;
        case ErrorCodes.BadRequest:
          return String(error.message);
        case ErrorCodes.BadGateway:
        case ErrorCodes.InternalServerError:
        case ErrorCodes.ServiceUnavailable:
          return 'Something went wrong on our side. Please try again later';
        default:
          return 'An unexpected error occurred';
      }
    }
  }

  if (errorResponse instanceof Error) {
    return errorResponse.message;
  }
  return 'An unexpected error occurred';
};
