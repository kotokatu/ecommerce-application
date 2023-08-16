import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/date-helpers';
import { ErrorResponse, MyCustomerDraft } from '@commercetools/platform-sdk';
import { handleErrorResponse } from '../api/handleErrorResponse';
import { ClientResponse } from '@commercetools/sdk-client-v2';

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

  private createCustomerDraft(userData: UserData): MyCustomerDraft {
    const customerDraft: MyCustomerDraft = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: formatDate(userData.dateOfBirth as Date),
      addresses: [
        { ...userData.shippingAddress },
        userData.copyShippingToBilling ? { ...userData.shippingAddress } : { ...userData.billingAddress },
      ],
      defaultShippingAddress: userData.setDefaultShippingAddress ? 0 : undefined,
      defaultBillingAddress: userData.setDefaultBillingAddress ? 1 : undefined,
    };
    return customerDraft;
  }

  public async signup(userData: UserData): Promise<string | void> {
    try {
      await this.apiRoot
        .me()
        .signup()
        .post({
          body: { ...this.createCustomerDraft(userData) },
        })
        .execute();
      await this.login(userData.email, userData.password);
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
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
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public logout() {
    this.apiRoot = new CtpClient().getApiRoot();
  }
}

export const userService = new UserService();
