export enum ErrorCodes {
  FailedToFetch = 0,
  Unauthorized = 401,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export const getErrorMessage = (errorResponse: unknown) => {
  if (errorResponse instanceof Error) {
    return errorResponse.message;
  }

  if (errorResponse && typeof errorResponse === 'object' && 'error' in errorResponse) {
    const error = errorResponse.error;

    if (error && typeof error === 'object' && 'statusCode' in error && 'message' in error) {
      switch (error.statusCode) {
        case ErrorCodes.Unauthorized:
          return 'Authorization failed. Please try again';
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
  return 'An unexpected error occurred';
};
