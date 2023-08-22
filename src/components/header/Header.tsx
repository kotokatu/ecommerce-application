import { Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import { headerStyle } from './header-style';
import HeaderLinks from '../app-links/HeaderLinks';

type HeaderProps = {
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  userLoggedIn: boolean;
  isOpenBurger: boolean;
  toggleBurger: () => void;
};

export function AppHeader({ setUserLoggedIn, userLoggedIn, isOpenBurger, toggleBurger }: HeaderProps) {
  const wrapper = document.querySelector('.wrapper') as HTMLElement;
  const { classes } = headerStyle();

  function toggleScroll() {
    if (wrapper) {
      wrapper.style.overflow = isOpenBurger ? 'hidden' : 'unset';
    }
  }

  return (
    <Header height={80} className={classes.root}>
      <Container className={classes.header}>
        <Group className={classes.title}>
          <NavLink to="/">
            <div className={classes.logobox}>
              <img className={classes.logo} src={require('../../assets/img/logo.png')} alt="30 Fingers Store Logo" />
              <div className={classes.titlebox}>
                <p className={classes.topTitle}>30 FINGERS</p>
                <p className={classes.downTitle}>STORE</p>
              </div>
            </div>
          </NavLink>
        </Group>

        <Group className={classes.userLinks}>
          <HeaderLinks userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        </Group>

        <Burger opened={isOpenBurger} onClick={toggleBurger} className={classes.burger} size="sm" />

        <Transition
          transition="slide-left"
          duration={500}
          mounted={isOpenBurger}
          onEnter={toggleScroll}
          onExited={toggleScroll}
        >
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <HeaderLinks userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
