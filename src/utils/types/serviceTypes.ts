import { Address } from '@commercetools/platform-sdk';

export type UserProfile = {
  version: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: UserAddress[];
  shippingAddress: UserAddress;
  billingAddress: UserAddress;
  shippingAddressAsDefault: boolean;
  billingAddressAsDefault: boolean;
};

export type UserAddress = {
  id: string;
  name: string;
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  isDefault: boolean;
  key: number;
};
