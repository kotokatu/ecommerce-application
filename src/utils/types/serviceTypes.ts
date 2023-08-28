import { Address } from '@commercetools/platform-sdk';

export type UserProfile = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: Address;
  billingAddress: Address;
  shippingAddressAsDefault: boolean;
  billingAddressAsDefault: boolean;
};
