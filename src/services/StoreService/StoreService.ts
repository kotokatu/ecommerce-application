import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { formatDate } from '../../utils/helpers/date-helpers';
import { CustomerDraft, Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';
import { getErrorMessage } from '../../utils/helpers/error-handler';
import { ProductProjection, ProductType, TermFacetResult } from '@commercetools/platform-sdk';
import { tokenCache } from '../api/BuildClient';
import { UserProfile, FullAddressInfo } from '../../utils/types/serviceTypes';
import { createAddress, handleAddressArray } from '../../utils/helpers/handleAddresses';

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

export const FilterParams = {
  brand: 'variants.attributes.brand',
  color: 'variants.attributes.color.label',
  size: 'variants.attributes.size.label',
  price: 'variants.price.centAmount',
};

export type QueryArgs = {
  filter?: string | string[] | undefined;
  ['text.en-US']?: string;
  facet?: string | string[];
  ['filter.facets']?: string | string[];
  fuzzy?: boolean;
  sort?: string | string[];
};

export type GetProductsReturnType = {
  brands: string[];
  colors: string[];
  sizes: string[];
  prices: string[];
  products: ProductProjection[];
};

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

class StoreService {
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
        ? [{ ...userData.shippingAddress }, { ...userData.shippingAddress }]
        : [{ ...userData.shippingAddress }, { ...userData.billingAddress }],
      shippingAddresses: [0],
      billingAddresses: [1],
      defaultShippingAddress: userData.setDefaultShippingAddress ? 0 : undefined,
      defaultBillingAddress: userData.setDefaultBillingAddress ? 1 : undefined,
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

  public async signupUser(userData: UserData): Promise<string | void> {
    try {
      await this.apiRoot
        .customers()
        .post({
          body: { ...this.createCustomerDraft(userData) },
        })
        .execute();
      await this.loginUser(userData.email, userData.password);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async loginUser(email: string, password: string) {
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

  public logoutUser() {
    tokenCache.clear();
    this.apiRoot = new CtpClient().getApiRoot();
  }

  public async getUserProfile() {
    try {
      const customerData = await this.apiRoot.me().get().execute();
      return this.createCustomerProfile(customerData.body);
    } catch (err) {
      throw new Error(getErrorMessage(err));
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
      this.logoutUser();
      await this.loginUser(email, passwordsData.newPassword);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async updateCurrentCustomer(
    customerUpdateDraft: CustomerUpdatePersonalDraft,
    version: number,
  ): Promise<string | void> {
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
      throw new Error(getErrorMessage(err));
    }
  }

  public async addAdress(address: Address, version: number, type: string, isDefault: boolean): Promise<string | void> {
    try {
      const addAddress = await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: 'addAddress',
                address,
              },
            ],
          },
        })
        .execute();
      const newAddress = addAddress.body.addresses[addAddress.body.addresses.length - 1];
      const newVersion = addAddress.body.version;
      this.addAddressToType(newAddress.id, newVersion, isDefault, type);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async removeAdress(addressId: string, version: number): Promise<string | void> {
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
      throw new Error(getErrorMessage(err));
    }
  }

  private async addAddressToType(
    addressId: string | undefined,
    version: number,
    isDefault: boolean,
    type: string,
  ): Promise<string | void> {
    const addShipAddress = 'addShippingAddressId';
    const addBilAddress = 'addBillingAddressId';
    try {
      const resp = await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: type === addressType.shipping ? addShipAddress : addBilAddress,
                addressId,
              },
            ],
          },
        })
        .execute();
      if (isDefault) {
        this.setDefaultAddress(resp.body.version, addressId, type);
      }
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  private async setDefaultAddress(
    version: number,
    addressId: string | undefined,
    type: string,
  ): Promise<string | void> {
    try {
      await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: type === addressType.shipping ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
                addressId,
              },
            ],
          },
        })
        .execute();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async updateAdress(
    version: number,
    address: FullAddressInfo,
    addressId: string,
    isDefault: boolean,
  ): Promise<string | void> {
    try {
      const resp = await this.apiRoot
        .me()
        .post({
          body: {
            version,
            actions: [
              {
                action: 'changeAddress',
                address: {
                  country: address.country,
                  streetName: address.streetName,
                  city: address.city,
                  postalCode: address.postalCode,
                },
                addressId,
              },
            ],
          },
        })
        .execute();
      if (address.isDefault) {
        this.setDefaultAddress(resp.body.version, addressId, address.name);
      }
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getProductTypes(): Promise<ProductType[] | undefined> {
    try {
      const productTypes = await this.apiRoot.productTypes().get().execute();
      return productTypes.body.results;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getProduct(ID: string): Promise<ProductProjection> {
    const productData = await this.apiRoot.productProjections().withId({ ID }).get().execute();
    return productData.body;
  }

  public async getCategories() {
    try {
      const categories = await this.apiRoot
        .categories()
        .get({ queryArgs: { expand: 'parent' } })
        .execute();
      return categories.body.results;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getProducts(params: QueryArgs): Promise<GetProductsReturnType | undefined> {
    try {
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            ...params,
            facet: Object.values(FilterParams),
          },
        })
        .execute();
      const { facets, results: products } = response.body;
      const [brands, colors, sizes, prices] = Object.values(FilterParams).map((facet) =>
        (facets[facet] as TermFacetResult).terms.map((term) => term.term),
      );
      return { brands, colors, sizes, prices, products };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getAllPrices(): Promise<number[]> {
    try {
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            facet: FilterParams.price,
          },
        })
        .execute();
      const { facets } = response.body;
      const prices = (facets[FilterParams.price] as TermFacetResult).terms.map((facet) => +facet.term);
      return [Math.min(...prices) / 100, Math.max(...prices) / 100];
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async createCart() {
    console.log('cart');
  }
  public async addProductToCart() {
    console.log('product');
  }
}

export const storeService = new StoreService();
