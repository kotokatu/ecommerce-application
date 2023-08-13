import { Dispatch, SetStateAction } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { AppHeader } from './header/Header';
import Footer from './footer/Footer';

type LayoutProps = {
  onSignIn: Dispatch<SetStateAction<boolean>>;
  userLoggedIn: boolean;
};

const Layout = ({ onSignIn, userLoggedIn }: LayoutProps) => {
  return (
    <Container className="wrapper">
      <AppHeader onSignIn={onSignIn} userLoggedIn={userLoggedIn} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default Layout;
