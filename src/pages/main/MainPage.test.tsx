/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import MainPage from './MainPage';
import { BrowserRouter } from 'react-router-dom';
import { storeService } from '../../services/StoreService/StoreService';
import '@testing-library/jest-dom/extend-expect';

describe('MainPage', () => {
  test('calls getDiscount method of storeService', async () => {
    jest.spyOn(storeService, 'getDiscount');
    await act(async () => {
      render(
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>,
      );
    });
    expect(storeService.getDiscount).toBeCalled();
  });

  test('renders promo code correctly', async () => {
    jest.spyOn(storeService, 'getDiscount').mockReturnValue(Promise.resolve({ code: 'SALE', value: 1000 }));
    await act(async () => {
      render(
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>,
      );
    });
    const promoCodeElement = screen.getByText(/10% off with code: SALE/i);
    expect(promoCodeElement).toBeInTheDocument();
  });

  test('does not render promo code when discount is not available', async () => {
    jest.spyOn(storeService, 'getDiscount').mockResolvedValue(null);
    await act(async () => {
      render(
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>,
      );
    });
    const promoCodeElement = screen.queryByText(/% off with code/i);
    expect(promoCodeElement).not.toBeInTheDocument();
  });
});
