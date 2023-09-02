import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/date-helpers';
import { ErrorResponse, CustomerDraft, Customer } from '@commercetools/platform-sdk';
import { handleErrorResponse } from '../api/handleErrorResponse';
import { ClientResponse } from '@commercetools/sdk-client-v2';
import { tokenCache } from '../api/TokenCache';
import { UserProfile } from '../../utils/types/serviceTypes';

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

interface CustomerUpdateDraft {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    streetNumber: string;
    zipCode: string;
    town: string;
  };
}

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
    const customerProfile: UserProfile = {
      version: userData.version,
      email: userData.email,
      password: userData.password || 'no data',
      firstName: userData.firstName || 'no data',
      lastName: userData.lastName || 'no data',
      dateOfBirth: userData.dateOfBirth || 'no data',
      shippingAddress: userData.addresses[0],
      billingAddress: userData.addresses[1],
      shippingAddressAsDefault: userData.defaultShippingAddressId ? true : false,
      billingAddressAsDefault: userData.defaultBillingAddressId ? true : false,
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

  public async changeUserData() {
    try {
      const aa = await this.apiRoot.me().password();
      console.log(999, aa);
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  // private updateCurrentCustomer(customerUpdateDraft: CustomerUpdateDraft, currentCustomer: UserProfile) {
  //   this.apiRoot
  //     .me()
  //     .post({
  //       body: {
  //         version: currentCustomer.version,
  //         actions: [
  //           {
  //             action: 'setFirstName',
  //             firstName: customerUpdateDraft.firstName,
  //           },
  //           {
  //             action: 'setLastName',
  //             lastName: customerUpdateDraft.lastName,
  //           },
  //           {
  //             action: 'changeAddress',
  //             addressId: currentCustomer.address.id,
  //             address: {
  //               firstName: customerUpdateDraft.firstName,
  //               lastName: customerUpdateDraft.lastName,
  //               streetName: customerUpdateDraft.address.street,
  //               streetNumber: customerUpdateDraft.address.streetNumber,
  //               postalCode: customerUpdateDraft.address.zipCode,
  //               city: customerUpdateDraft.address.town,
  //               country: currentCustomer.shippingAddress.country,
  //             },
  //           },
  //         ],
  //       },
  //     })
  //     .execute()
  //     .then(({ body }: ClientResponse<Customer>) => {
  //       this.handleUpdateCustomerSuccess(body);
  //     });
  // }

  private updateCurrentCustomer(customerUpdateDraft: CustomerUpdateDraft, currentCustomer: UserProfile) {
    this.apiRoot
      .me()
      .post({
        body: {
          version: currentCustomer.version,
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
              action: 'changeAddress',
              addressId: currentCustomer.shippingAddress,
              address: {
                firstName: customerUpdateDraft.firstName,
                lastName: customerUpdateDraft.lastName,
                streetName: customerUpdateDraft.address.street,
                streetNumber: customerUpdateDraft.address.streetNumber,
                postalCode: customerUpdateDraft.address.zipCode,
                city: customerUpdateDraft.address.town,
                country: currentCustomer.shippingAddress.country,
              },
            },
          ],
        },
      })
      .execute()
      .then(({ body }: ClientResponse<Customer>) => {
        this.handleUpdateCustomerSuccess(body);
      });
  }

  private handleUpdateCustomerSuccess(rawCustomer: Customer) {
    const updatedCustomer = this.createCustomer(rawCustomer);
    const customerInSession = JSON.parse(localStorage.getItem(CURRENT_CUSTOMER));
    updatedCustomer.password = customerInSession.password;
    localStorage.setItem(CURRENT_CUSTOMER, JSON.stringify(updatedCustomer));
    this.currentCustomerSubject.next(updatedCustomer);
    this.customerUpdateSuccessSubject.next(true);
  }
}

export const userService = new UserService();
