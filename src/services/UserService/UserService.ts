import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/date-helpers';
import { ErrorResponse, CustomerDraft, Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';
import { handleErrorResponse } from '../api/handleErrorResponse';
import { ClientResponse } from '@commercetools/sdk-client-v2';
import { tokenCache } from '../api/TokenCache';
import { UserProfile } from '../../utils/types/serviceTypes';
import { createAddress, handleAddressArray } from '../../utils/helpers/handleAddresses';

export type Address = {
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

interface CustomerUpdatePersonalDraft {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export type AddressUpdated = {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  id: string;
};

const addressType = {
  shipping: 'Shipping',
  billing: 'Billing',
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

  public createCustomerProfile(userData: Customer): UserProfile {
    const addresses = userData.addresses.map((address) => createAddress(userData, address));
    const customerProfile: UserProfile = {
      version: userData.version,
      email: userData.email,
      password: userData.password || 'no data',
      firstName: userData.firstName || 'no data',
      lastName: userData.lastName || 'no data',
      addresses: addresses || [],
      dateOfBirth: userData.dateOfBirth || 'no data',
      shippingAddress: handleAddressArray(addresses, 'Shipping'),
      billingAddress: handleAddressArray(addresses, 'Billing'),
    };
    return customerProfile;
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
      console.log('не вышло');
      this.apiRoot = new CtpClient().getApiRoot();
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public logout() {
    tokenCache.clear();
    this.apiRoot = new CtpClient().getApiRoot();
  }

  public async getProfile() {
    try {
      const customerData = await this.apiRoot.me().get().execute();
      return this.createCustomerProfile(customerData.body);
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public async changePassword(passwordsData: MyCustomerChangePassword, email: string): Promise<string | void> {
    try {
      await this.apiRoot
        .me()
        .password()
        .post({
          body: { ...passwordsData },
        })
        .execute();
      this.logout();
      await this.login(email, passwordsData.newPassword);
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public async updateCurrentCustomer(customerUpdateDraft: CustomerUpdatePersonalDraft, version: number) {
    try {
      await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: 'setFirstName',
                firstName: customerUpdateDraft.firstName,
              },
              {
                action: 'setLastName',
                lastName: customerUpdateDraft.lastName,
              },
              {
                action: 'setDateOfBirth',
                dateOfBirth: formatDate(customerUpdateDraft.dateOfBirth as Date),
              },
              {
                action: 'changeEmail',
                email: customerUpdateDraft.email,
              },
            ],
          },
        })
        .execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public async addAdress(address: Address, version: number, type: string) {
    try {
      const addAddress = await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: 'addAddress',
                address: address,
              },
            ],
          },
        })
        .execute();
      const newAddress = addAddress.body.addresses[addAddress.body.addresses.length - 1];
      const newVersion = addAddress.body.version;
      if (type === addressType.shipping) {
        this.addShippingAddress(newAddress.id, newVersion);
      } else {
        this.addBillingAddress(newAddress.id, newVersion);
      }
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public async removeAdress(addressId: string, version: number) {
    try {
      await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: 'removeAddress',
                addressId,
              },
            ],
          },
        })
        .execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  private async addShippingAddress(addressId: string | undefined, version: number) {
    try {
      await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: 'addShippingAddressId',
                addressId,
              },
            ],
          },
        })
        .execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  private async addBillingAddress(addressId: string | undefined, version: number) {
    try {
      await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: 'addBillingAddressId',
                addressId,
              },
            ],
          },
        })
        .execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
}

export const userService = new UserService();
