import fetch from 'node-fetch';
import { ClientBuilder, AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { PROJECT_KEY, SCOPE, CLIENT_ID, CLIENT_SECRET, region } from '../../utils/constants/api';

const projectKey = PROJECT_KEY;
const scopes = SCOPE.split(' ');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${region}.commercetools.com`,
  projectKey: projectKey,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${region}.commercetools.com`,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
