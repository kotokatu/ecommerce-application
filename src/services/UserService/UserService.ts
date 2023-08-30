import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/date-helpers';
import { ErrorResponse, CustomerDraft, Customer, ProductProjection } from '@commercetools/platform-sdk';
import { handleErrorResponse } from '../api/handleErrorResponse';
import { ClientResponse } from '@commercetools/sdk-client-v2';
import { UserProfile } from '../../utils/types/serviceTypes';
import { tokenCache } from '../api/TokenCache';

const CUSTOMER_DATA_STORAGE_KEY = 'customer-data-token-30fingers';

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

  private createCustomerProfile(userData: Customer) {
    const customerProfile: UserProfile = {
      email: userData.email,
      password: userData.password || 'no data',
      firstName: userData.firstName || 'no data',
      lastName: userData.lastName || 'no data',
      dateOfBirth: userData.dateOfBirth || 'no data',
      shippingAddress: userData.addresses[0],
      billingAddress: userData.addresses[1],
      shippingAddressAsDefault: userData.defaultShippingAddressId ? true : false,
      billingAddressAsDefault: userData.defaultShippingAddressId ? true : false,
    };
    localStorage.setItem(CUSTOMER_DATA_STORAGE_KEY, JSON.stringify(customerProfile));
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
      this.createCustomerProfile(customerSignIn.body.customer);
    } catch (err) {
      this.apiRoot = new CtpClient().getApiRoot();
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public getCustomerData(): UserProfile | null {
    return JSON.parse(localStorage.getItem(CUSTOMER_DATA_STORAGE_KEY) || '');
  }

  public logout() {
    tokenCache.clear();
    this.apiRoot = new CtpClient().getApiRoot();
  }

  public async getProducts() {
    try {
      return await this.apiRoot.productProjections().get().execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
  public async searchProducts() {
    try {
      await this.apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: 'variants.attributes.size.key: "large"' } })
        .execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
  public async getProduct(key: string): Promise<ProductProjection | undefined> {
    try {
      const productData = await this.apiRoot.productProjections().withKey({ key }).get().execute();
      return productData.body;
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
  public async getProfile() {
    try {
      await this.apiRoot.me().get().execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
}

export const userService = new UserService();
