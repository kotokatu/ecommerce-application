import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

import Layout from '../components/layout/Layout';
import MainPage from '../components/pages/main/MainPage';
import CatalogPage from '../components/pages/catalog/CatalogPage';
import AboutPage from '../components/pages/about-us/AboutPage';
import LoginPage from '../components/pages/login/LoginPage';
import RegistrationPage from '../components/pages/registration/RegistrationPage';
import BasketPage from '../components/pages/basket/BasketPage';
import ProfilePage from '../components/pages/profile/ProfilePage';
import NotFoundPage from '../components/pages/not-found/NotFoundPage';
import ProtectedRoute from '../services/ProtectedRoute/ProtectedRoute';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isOpenBurger, { toggle, close }] = useDisclosure(false);

  return (
    <MantineProvider
      theme={{
        primaryColor: 'dark',
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
          <Route index element={<MainPage />} />
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
