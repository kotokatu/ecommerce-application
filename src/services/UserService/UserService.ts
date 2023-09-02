import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/date-helpers';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { getErrorMessage } from '../../utils/helpers/error-handler';
import { tokenCache } from '../api/TokenCache';

type Address = {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
};

type UserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  shippingAddress: Address;
  billingAddress: Address;
  setDefaultShippingAddress: boolean;
  setDefaultBillingAddress: boolean;
  copyShippingToBilling: boolean;
};

class UserService {
  private apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = new CtpClient().getApiRoot();
  }

  private createCustomerDraft(userData: UserData): CustomerDraft {
    const customerDraft: CustomerDraft = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: formatDate(userData.dateOfBirth as Date),
      addresses: userData.copyShippingToBilling
        ? [{ ...userData.shippingAddress }]
        : [{ ...userData.shippingAddress }, { ...userData.billingAddress }],
      shippingAddresses: [0],
      billingAddresses: userData.copyShippingToBilling ? [0] : [1],
      defaultShippingAddress: userData.setDefaultShippingAddress ? 0 : undefined,
      defaultBillingAddress: !userData.setDefaultBillingAddress ? undefined : userData.copyShippingToBilling ? 0 : 1,
    };
    return customerDraft;
  }

  public async signup(userData: UserData): Promise<string | void> {
    try {
      await this.apiRoot
        .customers()
        .post({
          body: { ...this.createCustomerDraft(userData) },
        })
        .execute();
      await this.login(userData.email, userData.password);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async login(email: string, password: string) {
    try {
      this.apiRoot = new CtpClient({ username: email, password }).getApiRoot();
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
    } catch (err) {
      this.apiRoot = new CtpClient().getApiRoot();
      throw new Error(getErrorMessage(err));
    }
  }

  public logout() {
    tokenCache.clear();
    this.apiRoot = new CtpClient().getApiRoot();
  }

  public async getProfile() {
    try {
      await this.apiRoot.me().get().execute();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }
}

export const userService = new UserService();
