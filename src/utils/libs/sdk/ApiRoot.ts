import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import CtpClient from './BuildClients';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

class ApiRoot {
  apiRoot: ByProjectKeyRequestBuilder;
  constructor(authOptions?: UserAuthOptions) {
    this.apiRoot = authOptions ? new CtpClient(authOptions).getApiRoot() : new CtpClient().getApiRoot();
  }

  async signup(email: string, password: string) {
    await this.apiRoot
      .me()
      .signup()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
  }

  async login(email: string, password: string) {
    try {
      await this.apiRoot
        .me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
    } catch {
      console.log('error');
    }
  }
}

export default ApiRoot;
