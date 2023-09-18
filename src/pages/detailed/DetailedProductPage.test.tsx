/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { storeService } from '../../services/StoreService/StoreService';
import '@testing-library/jest-dom/extend-expect';
import DetailedProductPage from './DetailedProductPage';
import { ProductProjection, Price } from '@commercetools/platform-sdk';

describe('MainPage', () => {
  test('calls getProduct method of storeService', async () => {
    jest.spyOn(storeService, 'getProduct');
    const isLoading = false;
    const setIsLoading = jest.fn();
    await act(async () => {
      render(
        <BrowserRouter>
          <DetailedProductPage isLoading={isLoading} setIsLoading={setIsLoading} />
        </BrowserRouter>,
      );
    });
    expect(storeService.getProduct).toBeCalled();
  });

  test('renders the product info correctly', async () => {
    const mockPrice: Price = {
      id: 'mockId',
      value: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 1000,
        fractionDigits: 2,
      },
    };
    const mockProduct: ProductProjection = {
      id: 'mockId',
      version: 1,
      key: 'mockKey',
      createdAt: '2022-01-01T00:00:00Z',
      lastModifiedAt: '2022-01-01T00:00:00Z',
      productType: { typeId: 'product-type', id: 'productTypeId' },
      name: { 'en-US': 'Mock Product' },
      description: { 'en-US': 'Mock Product Description' },
      slug: { 'en-US': 'mock-product' },
      categories: [{ typeId: 'category', id: 'categoryId' }],
      hasStagedChanges: false,
      masterVariant: {
        id: 1,
        sku: 'mockSku',
        prices: [mockPrice],
      },
      variants: [],
    };

    const isLoading = false;
    const setIsLoading = jest.fn();
    jest.spyOn(storeService, 'getProduct').mockReturnValue(Promise.resolve(mockProduct));
    await act(async () => {
      render(
        <BrowserRouter>
          <DetailedProductPage isLoading={isLoading} setIsLoading={setIsLoading} />
        </BrowserRouter>,
      );
    });
    const productName = screen.getAllByText(/Mock Product/i)[0];
    expect(productName).toBeInTheDocument();
    const productDescription = screen.getByText(/Mock Product Description/i);
    expect(productDescription).toBeInTheDocument();
    const productPrice = screen.getByText(/10 €/i);
    expect(productPrice).toBeInTheDocument();
  });
});
