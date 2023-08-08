import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const authAnonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: process.env.REACT_APP_AUTH_URL as string,
  projectKey: process.env.REACT_APP_PROJECT_KEY as string,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID as string,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET as string,
  },
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_API_URL as string,
  fetch,
};

export const ctpAnonymousClient = new ClientBuilder()
  .withAnonymousSessionFlow(authAnonymousMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const anonymousApiRoot = createApiBuilderFromCtpClient(ctpAnonymousClient).withProjectKey({
  projectKey: process.env.REACT_APP_PROJECT_KEY as string,
});
