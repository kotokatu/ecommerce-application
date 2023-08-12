import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/date-helpers';
import { ErrorResponse, MyCustomerDraft } from '@commercetools/platform-sdk';

enum ErrorCodes {
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

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
      addresses: [{ ...userData.shippingAddress }, { ...userData.billingAddress }],
      defaultShippingAddress: userData.setDefaultShippingAddress ? 0 : undefined,
      defaultBillingAddress: userData.setDefaultBillingAddress ? 1 : undefined,
    };
    return customerDraft;
  }

  public signup(userData: UserData): Promise<string | void> {
    return this.apiRoot
      .me()
      .signup()
      .post({
        body: {
          ...this.createCustomerDraft(userData),
        },
      })
      .execute()
      .then(() => {
        this.apiRoot = new CtpClient({ username: userData.email, password: userData.password }).getApiRoot();
      })
      .catch((err: ErrorResponse) => {
        switch (err.statusCode) {
          case ErrorCodes.BadRequest:
            throw new Error(err.message);
          case ErrorCodes.BadGateway:
          case ErrorCodes.InternalServerError:
          case ErrorCodes.ServiceUnavailable:
            throw new Error('Something went wrong on our side. Please try again later');
          default:
            throw new Error('An unexpected error occurred');
        }
      });
  }

  public login(email: string, password: string) {
    return this.apiRoot
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute()
      .then(() => (this.apiRoot = new CtpClient({ username: email, password }).getApiRoot()))
      .catch((err: ErrorResponse) => {
        throw new Error(err.message);
      });
  }

  public logout() {
    this.apiRoot = new CtpClient().getApiRoot();
  }
}

export const userService = new UserService();
