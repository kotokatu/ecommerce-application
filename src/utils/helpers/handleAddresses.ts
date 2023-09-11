import { FullAddressInfo } from '../types/serviceTypes';
import { AddressUpdated } from '../../services/StoreService/StoreService';
import { Customer, Address } from '@commercetools/platform-sdk';

export const createAddress = (userData: Customer, addressData: Address): FullAddressInfo => {
  const data = addressData as AddressUpdated;
  const address: FullAddressInfo = {
    id: data.id || '',
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
    address.isDefault = userData.defaultShippingAddressId === addressData.id;
  } else if (userData.billingAddressIds && isBilling) {
    address.name = 'Billing';
    address.isDefault = userData.defaultBillingAddressId === addressData.id;
  }
  return address;
};

export const handleAddressArray = (addresses: FullAddressInfo[], addressType: string): FullAddressInfo[] => {
  return addresses.filter((address) => address.name === addressType);
};
