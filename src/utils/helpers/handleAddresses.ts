import { FullAddressInfo } from '../types/serviceTypes';
import { AddressUpdated } from '../../services/UserService/UserService';
import { Customer } from '@commercetools/platform-sdk';

export const createAddress = (userData: Customer, data: AddressUpdated): FullAddressInfo => {
  const address: FullAddressInfo = {
    id: '',
    key: Math.floor(Math.random() * 999999),
    name: '',
    country: data.country || '',
    city: data.city || '',
    streetName: data.streetName || '',
    postalCode: data.postalCode || '',
    isDefault: false,
  };

  const isShipping = userData.shippingAddressIds?.find((address) => address === data.id);
  const isBilling = userData.billingAddressIds?.find((address) => address === data.id);

  if (userData.shippingAddressIds && isShipping) {
    address.name = 'Shipping';
    address.isDefault = !!userData.defaultShippingAddressId;
  } else if (userData.billingAddressIds && isBilling) {
    address.name = 'Billing';
    address.isDefault = !!userData.defaultBillingAddressId;
  }
  return address;
};
