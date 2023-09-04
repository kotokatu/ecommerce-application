export type UserProfile = {
  version: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: FullAddressInfo[];
  shippingAddress: FullAddressInfo[];
  billingAddress: FullAddressInfo[];
  shippingAddressAsDefault: boolean;
  billingAddressAsDefault: boolean;
};

export type FullAddressInfo = {
  id: string;
  name: string;
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  isDefault: boolean;
  key: number;
};
