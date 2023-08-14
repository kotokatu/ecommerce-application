import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import Layout from '../components/layout/Layout';
import MainPage from '../components/pages/main/MainPage';
import CatalogPage from '../components/pages/catalog/CatalogPage';
import AboutPage from '../components/pages/about-us/AboutPage';
import LoginPage from '../components/pages/login/LoginPage';
import RegistrationPage from '../components/pages/registration/RegistrationPage';
import BasketPage from '../components/pages/basket/BasketPage';
import ProfilePage from '../components/pages/profile/ProfilePage';
import NotFoundPage from '../components/pages/not-found/NotFoundPage';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

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
        <Route path="/" element={<Layout setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn} />}>
          <Route index element={<MainPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage onSignIn={setUserLoggedIn} />} />
          <Route
            path="registration"
            element={userLoggedIn ? <Navigate to="/" /> : <RegistrationPage onSignIn={setUserLoggedIn} />}
          />
          <Route path="basket" element={<BasketPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
