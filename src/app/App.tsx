import { useEffect, useState } from 'react';
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

function App() {
  const loginState = localStorage.getItem('userLoggedIn');
  const [userLoggedIn, setUserLoggedIn] = useState(loginState ? JSON.parse(loginState) : false);
  const [isOpenBurger, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));
  }, [userLoggedIn]);

  return (
    <MantineProvider
      theme={{
        primaryColor: 'dark',
        fontFamily: 'Days-One',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-center" />
      <AuthProvider userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}>
        <Routes>
          <Route path="/" element={<Layout isOpenBurger={isOpenBurger} closeBurger={close} toggleBurger={toggle} />}>
            <Route index element={<MainPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="about" element={<AboutPage />} />

            <Route element={<ProtectedRoute userLoggedIn={!userLoggedIn} redirectPath="/login" />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route element={<ProtectedRoute userLoggedIn={userLoggedIn} />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="registration" element={<RegistrationPage />} />
            </Route>

            <Route path=":productKey" element={<DetailedProductPage />} />
            <Route path="basket" element={<BasketPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
