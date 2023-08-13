import { Dispatch, SetStateAction } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { AppHeader } from './header/Header';
import Footer from './footer/Footer';

type LayoutProps = {
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  userLoggedIn: boolean;
};

const Layout = ({ setUserLoggedIn, userLoggedIn }: LayoutProps) => {
  return (
    <Container className="wrapper">
      <AppHeader setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default Layout;
