import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider, Container } from '@mantine/core';
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
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container className="wrapper">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage onSignin={setUserLoggedIn} />} />
            <Route path="basket" element={<BasketPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Container>
    </MantineProvider>
  );
}

export default App;
