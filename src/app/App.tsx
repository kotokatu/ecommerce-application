import './App.scss';
import { useState } from 'react';
import UserService from '../services/UserService/UserService';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MainPage from '../components/pages/main/MainPage';
import CatalogPage from '../components/pages/catalog/CatalogPage';
import AboutPage from '../components/pages/about-us/AboutPage';
import LoginPage from '../components/pages/login/LoginPage';
import RegistrationPage from '../components/pages/registration/RegistrationPage';
import BasketPage from '../components/pages/basket/BasketPage';
import NotFoundPage from '../components/pages/not-found/NotFoundPage';

export interface User {
  userService: UserService;
  isLoggedIn: boolean;
}

const userService = new UserService();

function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  // async function loginUser(username: string, password: string) {
  //   try {
  //     await userService.login(username, password);
  //     setUserIsLoggedIn(true);
  //   } catch {
  //     console.log('error');
  //   }
  // }

  async function signupUser(username: string, password: string) {
    try {
      await userService.signup(username, password);
      setUserIsLoggedIn(true);
    } catch {
      console.log('error');
    }
  }

  // function logoutUser() {
  //   userService.logout();
  //   setUserIsLoggedIn(false);
  // }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage onSignup={signupUser} />} />
        <Route path="basket" element={<BasketPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
