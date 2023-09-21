import { useState, useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { Cart } from '@commercetools/platform-sdk';
import { storeService } from '../services/StoreService/StoreService';
import { notificationError } from '../components/ui/notification';
import { LOGIN_STORAGE_KEY } from '../services/api/TokenCache';

import Layout from '../layout/Layout';
import ProtectedRoute from '../routes/ProtectedRoute';
import AuthProvider from '../routes/AuthProvider';

const MainPage = lazy(() => import('../pages/main/MainPage'));
const CatalogPage = lazy(() => import('../pages/catalog/CatalogPage'));
const AboutPage = lazy(() => import('../pages/about-us/AboutPage'));
const LoginPage = lazy(() => import('../pages/login/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/registration/RegistrationPage'));
const CartPage = lazy(() => import('../pages/cart/CartPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const NotFoundPage = lazy(() => import('../pages/not-found/NotFoundPage'));
const DetailedProductPage = lazy(() => import('../pages/detailed/DetailedProductPage'));

function App() {
  const loginState = localStorage.getItem(LOGIN_STORAGE_KEY);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(() => (loginState ? JSON.parse(loginState) : false));
  const [isOpenBurger, { toggle, close }] = useDisclosure(false);
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(userLoggedIn));
  }, [userLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCartLoading(true);
        const cart = await storeService.getActiveCart();
        setCart(cart);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      } finally {
        setCartLoading(false);
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
              element={
                <CatalogPage
                  isOpenNavbar={isOpenNavbar}
                  setIsOpenNavbar={setIsOpenNavbar}
                  isLoading={cartLoading}
                  setIsLoading={setCartLoading}
                />
              }
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
              element={
                <CatalogPage
                  isOpenNavbar={isOpenNavbar}
                  setIsOpenNavbar={setIsOpenNavbar}
                  isLoading={cartLoading}
                  setIsLoading={setCartLoading}
                />
              }
            />
            <Route
              path="catalog/:category/:subcategory"
              element={
                <CatalogPage
                  isOpenNavbar={isOpenNavbar}
                  setIsOpenNavbar={setIsOpenNavbar}
                  isLoading={cartLoading}
                  setIsLoading={setCartLoading}
                />
              }
            />
            <Route
              path="/catalog/product/:productID"
              element={<DetailedProductPage isLoading={cartLoading} setIsLoading={setCartLoading} />}
            />

            <Route path="basket" element={<CartPage isLoading={cartLoading} setIsLoading={setCartLoading} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
