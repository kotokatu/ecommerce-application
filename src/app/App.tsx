import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

import Layout from '../layout/Layout';
import MainPage from '../pages/main/MainPage';
import CatalogPage from '../pages/catalog/CatalogPage';
import AboutPage from '../pages/about-us/AboutPage';
import LoginPage from '../pages/login/LoginPage';
import RegistrationPage from '../pages/registration/RegistrationPage';
import CartPage from '../pages/cart/CartPage';
import ProfilePage from '../pages/profile/ProfilePage';
import NotFoundPage from '../pages/not-found/NotFoundPage';
import ProtectedRoute from '../routes/ProtectedRoute';
import AuthProvider from '../routes/AuthProvider';
import DetailedProductPage from '../pages/detailed/DetailedProductPage';
import { tokenCache } from '../services/api/TokenCache';
import { Cart } from '@commercetools/platform-sdk';
import { storeService } from '../services/StoreService/StoreService';
import { notificationError } from '../components/ui/notification';
import { LOGIN_STORAGE_KEY } from '../services/api/TokenCache';
function App() {
  const loginState = localStorage.getItem(LOGIN_STORAGE_KEY);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(() =>
    loginState ? tokenCache.checkToken() && JSON.parse(loginState) : false,
  );
  const [isOpenBurger, { toggle, close }] = useDisclosure(false);
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartLoading, setIsCartLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(userLoggedIn));
  }, [userLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsCartLoading(true);
        const cart = await storeService.getActiveCart();
        setCart(cart);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      } finally {
        setIsCartLoading(false);
      }
    };
    fetchData();
  }, [userLoggedIn]);

  return (
    <MantineProvider
      theme={{
        primaryColor: 'dark',
        fontFamily: 'Days-One',
        breakpoints: {
          md: '945',
          sm: '811',
          xs: '470',
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-center" />
      <AuthProvider userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} cart={cart} setCart={setCart}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isOpenBurger={isOpenBurger}
                closeBurger={close}
                toggleBurger={toggle}
                isOpenNavbar={isOpenNavbar}
                setIsOpenNavbar={setIsOpenNavbar}
              />
            }
          >
            <Route index element={<MainPage />} />
            <Route
              path="catalog"
              element={<CatalogPage isOpenNavbar={isOpenNavbar} setIsOpenNavbar={setIsOpenNavbar} />}
            />
            <Route path="about" element={<AboutPage />} />

            <Route element={<ProtectedRoute userLoggedIn={!userLoggedIn} redirectPath="/login" />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route element={<ProtectedRoute userLoggedIn={userLoggedIn} />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="registration" element={<RegistrationPage />} />
            </Route>

            <Route
              path="catalog/:category"
              element={<CatalogPage isOpenNavbar={isOpenNavbar} setIsOpenNavbar={setIsOpenNavbar} />}
            />
            <Route
              path="catalog/:category/:subcategory"
              element={<CatalogPage isOpenNavbar={isOpenNavbar} setIsOpenNavbar={setIsOpenNavbar} />}
            />
            <Route
              path="/catalog/product/:productID"
              element={<DetailedProductPage isLoading={isCartLoading} setIsLoading={setIsCartLoading} />}
            />

            <Route path="basket" element={<CartPage isLoading={isCartLoading} setIsLoading={setIsCartLoading} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
