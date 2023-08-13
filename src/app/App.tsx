import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MantineProvider, Container } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Layout from '../components/layout/Layout';
import MainPage from '../components/pages/main/MainPage';
import CatalogPage from '../components/pages/catalog/CatalogPage';
import AboutPage from '../components/pages/about-us/AboutPage';
import LoginPage from '../components/pages/login/LoginPage';
import RegistrationPage from '../components/pages/registration/RegistrationPage';
import BasketPage from '../components/pages/basket/BasketPage';
import NotFoundPage from '../components/pages/not-found/NotFoundPage';
import { useState } from 'react';

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
      <Container className="wrapper">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage onSignIn={setUserLoggedIn} />} />
            <Route
              path="registration"
              element={userLoggedIn ? <Navigate to="/" /> : <RegistrationPage onSignIn={setUserLoggedIn} />}
            />
            <Route path="basket" element={<BasketPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Container>
    </MantineProvider>
  );
}

export default App;
