import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { AppHeader } from '../components/header/Header';
import { Suspense } from 'react';
import Footer from '../components/footer/Footer';
import CenterLoader from '../components/loader/CenterLoader';

type LayoutProps = {
  isOpenBurger: boolean;
  closeBurger: () => void;
  toggleBurger: () => void;
  isOpenNavbar: boolean;
  setIsOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Layout = ({ isOpenBurger, closeBurger, toggleBurger, isOpenNavbar, setIsOpenNavbar }: LayoutProps) => {
  function closeBurgerDelay(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const wrapper = document.querySelector('.wrapper') as HTMLElement;

    if (isOpenBurger) {
      setTimeout(() => {
        closeBurger();
      }, 100);
    }

    if (e.target === wrapper) {
      setIsOpenNavbar(!isOpenNavbar);
      wrapper.className = !isOpenNavbar ? 'wrapper lock blackout' : 'wrapper';
    }
  }

  return (
    <Container className="wrapper" onClick={(e) => closeBurgerDelay(e)}>
      <AppHeader isOpenBurger={isOpenBurger} toggleBurger={toggleBurger} />
      <main className="main">
        <Suspense fallback={<CenterLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </Container>
  );
};

export default Layout;
