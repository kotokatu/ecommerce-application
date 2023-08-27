import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { AppHeader } from '../components/header/Header';
import Footer from '../components/footer/Footer';

type LayoutProps = {
  isOpenBurger: boolean;
  closeBurger: () => void;
  toggleBurger: () => void;
};

const Layout = ({ isOpenBurger, closeBurger, toggleBurger }: LayoutProps) => {
  function closeBurgerDelay() {
    if (isOpenBurger) {
      setTimeout(() => {
        closeBurger();
      }, 100);
    }
  }

  return (
    <Container className="wrapper" onClick={closeBurgerDelay}>
      <AppHeader isOpenBurger={isOpenBurger} toggleBurger={toggleBurger} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default Layout;
