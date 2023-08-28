import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/date-helpers';
import { ErrorResponse, CustomerDraft } from '@commercetools/platform-sdk';
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
  private customerData: CustomerDraft | null;
  constructor() {
    this.customerData = null;
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

  private createCustomerObject(userData: CustomerDraft) {
    this.customerData = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
      /*addresses: userData.copyShippingToBilling
        ? [{ ...userData.shippingAddress }]
        : [{ ...userData.shippingAddress }, { ...userData.billingAddress }],
      shippingAddresses: [0],
      billingAddresses: userData.copyShippingToBilling ? [0] : [1],
      defaultShippingAddress: userData.setDefaultShippingAddress ? 0 : undefined,
      defaultBillingAddress: !userData.setDefaultBillingAddress ? undefined : userData.copyShippingToBilling ? 0 : 1,
    */
    };
  }

  public async signup(userData: UserData): Promise<string | void> {
    this.apiRoot = new CtpClient().getApiRoot();
    try {
      await this.apiRoot
        .customers()
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
      const customerSignIn = await this.apiRoot
        .me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
      this.createCustomerObject(customerSignIn.body.customer);
      console.log(customerSignIn.body.customer);
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public getCustomerData(): CustomerDraft | null {
    return this.customerData;
  }

  public logout() {
    this.apiRoot = new CtpClient().getApiRoot();
  }
}

export const userService = new UserService();

const customerData = {
  customer: {
    id: 'fd5fe676-bc43-4cba-b922-13dc1a71522c',
    version: 1,
    versionModifiedAt: '2023-08-20T04:12:23.061Z',
    lastMessageSequenceNumber: 1,
    createdAt: '2023-08-20T04:12:23.061Z',
    lastModifiedAt: '2023-08-20T04:12:23.061Z',
    lastModifiedBy: {
      clientId: 'OoukhLJaJweagUnRGY7tvzSO',
      isPlatformClient: false,
    },
    createdBy: {
      clientId: 'OoukhLJaJweagUnRGY7tvzSO',
      isPlatformClient: false,
    },
    email: 'aa@mail.com',
    firstName: 'qqqq',
    lastName: 'sfds',
    dateOfBirth: '1990-02-01',
    password: '****d14=',
    addresses: [
      {
        id: '-QJXGJmE',
        streetName: 'sfsg',
        postalCode: '12345',
        city: 'wewef',
        country: 'IT',
      },
      {
        id: '-9SA8NSX',
        streetName: 'fggdf',
        postalCode: '12345',
        city: 'dfsd',
        country: 'IT',
      },
    ],
    shippingAddressIds: ['-QJXGJmE'],
    billingAddressIds: ['-9SA8NSX'],
    isEmailVerified: false,
    stores: [],
    authenticationMode: 'Password',
  },
};
