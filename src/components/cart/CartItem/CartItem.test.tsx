import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LineItem } from '@commercetools/platform-sdk';
import '@testing-library/jest-dom/extend-expect';
import CartItem from './CartItem';

describe('CartItem', () => {
  it('should render the cart item with all necessary information', () => {
    const item: LineItem = {
      id: 'id1',
      productId: 'pid1',
      name: {
        'en-US': 'Nike T-Shirt',
      },
      productType: {
        typeId: 'product-type',
        id: 'ptid1',
      },
      variant: {
        id: 1,
        sku: 'SKU1',
        key: 'vk1',
        prices: [
          {
            id: 'price1',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 1000,
              fractionDigits: 2,
            },
          },
        ],
        attributes: [
          {
            name: 'size',
            value: {
              key: 'XL',
              label: 'XL',
            },
          },
        ],
        assets: [],
      },
      price: {
        id: 'price2',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 1000,
          fractionDigits: 2,
        },
      },
      quantity: 1,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      state: [
        {
          quantity: 1,
          state: {
            typeId: 'state',
            id: 'stateid',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 1000,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    };
    const isLoading = false;
    const setIsLoading = jest.fn();
    render(
      <BrowserRouter>
        <CartItem item={item} isLoading={isLoading} setIsLoading={setIsLoading} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Nike T-Shirt')).toBeInTheDocument();
    expect(screen.getAllByText('10 €')[0]).toBeInTheDocument();
    expect(screen.getByText('Size: XL')).toBeInTheDocument();
  });
});
