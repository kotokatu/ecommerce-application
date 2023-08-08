import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_API_URL as string,
  fetch,
};

const createPasswordCredentials = (username: string, password: string): PasswordAuthMiddlewareOptions => {
  return {
    host: process.env.REACT_APP_AUTH_URL as string,
    projectKey: process.env.REACT_APP_PROJECT_KEY as string,
    credentials: {
      clientId: process.env.REACT_APP_CLIENT_ID as string,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET as string,
      user: {
        username,
        password,
      },
    },
    scopes: [process.env.REACT_APP_CUSTOMER_SCOPES as string],
    fetch,
  };
};

export const createCtpCustomerClient = (username: string, password: string) => {
  return new ClientBuilder()
    .withPasswordFlow(createPasswordCredentials(username, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

export const createApiCustomerRoot = (username: string, password: string) =>
  createApiBuilderFromCtpClient(createCtpCustomerClient(username, password)).withProjectKey({
    projectKey: process.env.REACT_APP_PROJECT_KEY as string,
  });

export const signup = (apiRoot: ByProjectKeyRequestBuilder, email: string, password: string) => {
  return apiRoot
    .me()
    .signup()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();
};

export const login = (apiRoot: ByProjectKeyRequestBuilder, email: string, password: string) => {
  return apiRoot
    .me()
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();
};
