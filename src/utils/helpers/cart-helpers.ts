import { Cart } from '@commercetools/platform-sdk';

export const checkProductInCart = (productId: string, variantId: number, cart: Cart) => {
  if (
    cart &&
    cart.lineItems.find((lineItem) => lineItem.productId === productId && lineItem.variant.id === variantId)
  ) {
    return true;
  }
  return false;
};
