import {
  ClientBuilder,
  type Client,
  type Credentials,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
  type UserAuthOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { tokenCache } from './TokenCache';

class CtpClient {
  private projectKey = process.env.REACT_APP_PROJECT_KEY as string;
  private authURL = process.env.REACT_APP_AUTH_URL as string;
  private apiURL = process.env.REACT_APP_API_URL as string;
  private credentials: Credentials = {
    clientId: process.env.REACT_APP_CLIENT_ID as string,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET as string,
  };
  private userAuthOptions?: UserAuthOptions;

  constructor(userAuthOptions?: UserAuthOptions) {
    if (userAuthOptions) this.userAuthOptions = userAuthOptions;
  }

  private getClient(): Client {
    if (this.userAuthOptions) {
      return new ClientBuilder()
        .withPasswordFlow(this.getUserAuthOptions())
        .withHttpMiddleware(this.getHttpMiddlewareOptions())
        .withLoggerMiddleware()
        .build();
    } else if (tokenCache.getRefreshToken()) {
      return new ClientBuilder()
        .withRefreshTokenFlow(this.getRefreshTokenOptions())
        .withHttpMiddleware(this.getHttpMiddlewareOptions())
        .withLoggerMiddleware()
        .build();
    }
    return new ClientBuilder()
      .withClientCredentialsFlow(this.getAuthOptions())
      .withHttpMiddleware(this.getHttpMiddlewareOptions())
      .build();
  }

  private getUserAuthOptions(): PasswordAuthMiddlewareOptions {
    return {
      host: this.authURL,
      projectKey: this.projectKey,
      credentials: { ...this.credentials, user: this.userAuthOptions as UserAuthOptions },
      fetch,
      tokenCache: tokenCache,
    };
  }

  private getAuthOptions(): AuthMiddlewareOptions {
    return {
      host: this.authURL,
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

  getRefreshTokenOptions(): RefreshAuthMiddlewareOptions {
    return {
      host: this.apiURL,
      projectKey: this.projectKey,
      credentials: this.credentials,
      refreshToken: 'bXvTyxc5yuebdvwTwyXn==',
      tokenCache: tokenCache,
      fetch,
    };
  }

  public getApiRoot() {
    return createApiBuilderFromCtpClient(this.getClient()).withProjectKey({ projectKey: this.projectKey });
  }
}

export default CtpClient;
