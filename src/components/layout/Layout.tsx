import { Dispatch, SetStateAction } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { AppHeader } from './header/Header';
import Footer from './footer/Footer';

type LayoutProps = {
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  userLoggedIn: boolean;
  isOpenBurger: boolean;
  closeBurger: () => void;
  toggleBurger: () => void;
};

const Layout = ({ setUserLoggedIn, userLoggedIn, isOpenBurger, closeBurger, toggleBurger }: LayoutProps) => {
  function closeBurgerDelay() {
    if (isOpenBurger) {
      setTimeout(() => {
        closeBurger();
      }, 100);
    }
  }

  return (
    <Container className="wrapper" onClick={closeBurgerDelay}>
      <AppHeader
        setUserLoggedIn={setUserLoggedIn}
        userLoggedIn={userLoggedIn}
        isOpenBurger={isOpenBurger}
        toggleBurger={toggleBurger}
      />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default Layout;
