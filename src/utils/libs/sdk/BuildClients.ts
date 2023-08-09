import {
  ClientBuilder,
  type Client,
  type Credentials,
  type HttpMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type UserAuthOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const userClientBuilder = new ClientBuilder();
const anonymousClientBuilder = new ClientBuilder();

class CtpClient {
  private projectKey: string = process.env.REACT_APP_PROJECT_KEY as string;
  private oauthURL: string = process.env.REACT_APP_AUTH_URL as string;
  private apiURL: string = process.env.REACT_APP_API_URL as string;
  private credentials: Credentials = {
    clientId: process.env.REACT_APP_CLIENT_ID as string,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET as string,
  };
  private userAuthOptions?: UserAuthOptions;

  constructor(userAuthOptions?: UserAuthOptions) {
    if (userAuthOptions) this.userAuthOptions = userAuthOptions;
  }

  private getClient(): Client {
    return this.userAuthOptions
      ? userClientBuilder
          .withProjectKey(this.projectKey)
          .withPasswordFlow(this.getUserAuthOptions())
          .withHttpMiddleware(this.getHttpMiddlewareOptions())
          .withLoggerMiddleware()
          .build()
      : anonymousClientBuilder
          .withProjectKey(this.projectKey)
          .withAnonymousSessionFlow(this.getAnonymousAuthOptions())
          .withHttpMiddleware(this.getHttpMiddlewareOptions())
          .withLoggerMiddleware()
          .build();
  }

  public getProjectKey(): string {
    return this.projectKey;
  }

  private getUserAuthOptions(): PasswordAuthMiddlewareOptions {
    return {
      host: this.oauthURL,
      projectKey: this.projectKey,
      credentials: { ...this.credentials, user: this.userAuthOptions as UserAuthOptions },
      fetch,
    };
  }

  private getAnonymousAuthOptions(): AnonymousAuthMiddlewareOptions {
    return {
      host: this.oauthURL,
      projectKey: this.projectKey,
      credentials: this.credentials,
      fetch,
    };
  }

  private getHttpMiddlewareOptions(): HttpMiddlewareOptions {
    return {
      host: this.apiURL,
      fetch,
    };
  }

  public getApiRoot() {
    return createApiBuilderFromCtpClient(this.getClient()).withProjectKey({ projectKey: this.projectKey });
  }
}

export default CtpClient;
