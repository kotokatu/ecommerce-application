import { useState } from 'react';
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
import BasketPage from '../pages/basket/BasketPage';
import ProfilePage from '../pages/profile/ProfilePage';
import NotFoundPage from '../pages/not-found/NotFoundPage';
import ProtectedRoute from '../routes/ProtectedRoute';
import AuthProvider from '../routes/AuthProvider';
import DetailedProductPage from '../pages/detailed/DetailedProductPage';
import { storeService } from '../services/StoreService/StoreService';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(storeService.isUserLoggedIn);
  const [isOpenBurger, { toggle, close }] = useDisclosure(false);
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);

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
      <AuthProvider userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}>
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
            <Route path="/catalog/product/:productID" element={<DetailedProductPage />} />

            <Route path="basket" element={<BasketPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
