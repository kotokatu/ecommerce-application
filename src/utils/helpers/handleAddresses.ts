import { UserAddress } from '../types/serviceTypes';
import { AddressUpdated } from '../../services/UserService/UserService';
import { Customer } from '@commercetools/platform-sdk';

export const createAddress = (userData: Customer, name: string): UserAddress => {
  let data = {
    id: '',
    country: '',
    city: '',
    streetName: '',
    postalCode: '',
  };
  let isDefault = false;
  let key = Math.floor(Math.random() * 999999);
  if (name === 'Shipping') {
    data = userData.addresses[0] as AddressUpdated;
    isDefault = !!userData.defaultShippingAddressId;
    key = 0;
  } else if (name === 'Billing') {
    data = userData.addresses[1] as AddressUpdated;
    isDefault = !!userData.defaultBillingAddressId;
    key = 1;
  }
  const address: UserAddress = {
    id: data.id,
    key,
    name,
    country: data.country,
    city: data.city,
    streetName: data.streetName,
    postalCode: data.postalCode,
    isDefault,
  };
  return address;
};
