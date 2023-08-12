import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/dateHelpers';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { successfullMessage, unknownErrMessage } from '../../utils/constants/messages';

type UserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  shippingAddress: {
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
  };
  billingAddress: {
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
  };
  setDefaultShippingAddress: boolean;
  setDefaultBillingAddress: boolean;
};

type UserLogIn = {
  email: string;
  password: string;
};

class UserService {
  apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = new CtpClient().getApiRoot();
  }

  createCustomerDraft(userData: UserData): MyCustomerDraft {
    let customerDraft: MyCustomerDraft = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: formatDate(userData.dateOfBirth as Date),
      addresses: [
        {
          ...userData.shippingAddress,
        },
        {
          ...userData.billingAddress,
        },
      ],
    };
    if (userData.setDefaultShippingAddress) customerDraft = { ...customerDraft, defaultShippingAddress: 0 };
    if (userData.setDefaultBillingAddress) customerDraft = { ...customerDraft, defaultBillingAddress: 1 };
    return customerDraft;
  }

  signup(userData: UserData): Promise<string | void> {
    return this.apiRoot
      .me()
      .signup()
      .post({
        body: {
          ...this.createCustomerDraft(userData),
        },
      })
      .execute()
      .then((data) => {
        console.log(data);
        this.apiRoot = new CtpClient({ username: userData.email, password: userData.password }).getApiRoot();
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  }

  public login(userLogin: UserLogIn) {
    return this.apiRoot
      .me()
      .login()
      .post({
        body: {
          email: userLogin.email,
          password: userLogin.password,
        },
      })
      .execute()
      .then(
        () => (this.apiRoot = new CtpClient({ username: userLogin.email, password: userLogin.password }).getApiRoot()),
      )
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  }

  logout() {
    this.apiRoot = new CtpClient().getApiRoot();
  }
}

export const userService = new UserService();
