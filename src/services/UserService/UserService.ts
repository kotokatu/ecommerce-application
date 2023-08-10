import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

class UserService {
  apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = new CtpClient().getApiRoot();
  }

  signup(email: string, password: string): Promise<string | void> {
    return this.apiRoot
      .me()
      .signup()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute()
      .then((data) => {
        console.log(data);
        this.apiRoot = new CtpClient({ username: email, password }).getApiRoot();
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
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
      this.apiRoot = new CtpClient({ username: email, password }).getApiRoot();
    } catch {
      console.log('error');
    }
  }

  logout() {
    this.apiRoot = new CtpClient().getApiRoot();
  }
}

export const userService = new UserService();
