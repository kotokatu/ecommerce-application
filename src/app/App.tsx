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
import ProtectedRoute from '../routes/ProtectedRoute/ProtectedRoute';

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
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              setUserLoggedIn={setUserLoggedIn}
              userLoggedIn={userLoggedIn}
              isOpenBurger={isOpenBurger}
              closeBurger={close}
              toggleBurger={toggle}
            />
          }
        >
          <Route index element={<MainPage userLoggedIn={userLoggedIn} />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="about" element={<AboutPage />} />

          <Route element={<ProtectedRoute userLoggedIn={!userLoggedIn} redirectPath="/login" />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route element={<ProtectedRoute userLoggedIn={userLoggedIn} />}>
            <Route path="login" element={<LoginPage onSignIn={setUserLoggedIn} />} />
            <Route path="registration" element={<RegistrationPage onSignIn={setUserLoggedIn} />} />
          </Route>

          <Route path="basket" element={<BasketPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
