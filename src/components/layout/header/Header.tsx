import { Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import { headerStyle } from './header-style';
import UserLinks from '../../ui/app-links/UserLinks';
import MenuLinks from '../../ui/app-links/MenuLinks';

type HeaderProps = {
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  userLoggedIn: boolean;
  isOpenBurger: boolean;
  toggleBurger: () => void;
};

export function AppHeader({ setUserLoggedIn, userLoggedIn, isOpenBurger, toggleBurger }: HeaderProps) {
  const { classes } = headerStyle();

  return (
    <Header height={80} className={classes.root}>
      <Container className={classes.header}>
        <Group className={classes.title}>
          <NavLink to="/">
            <div className={classes.logobox}>
              <img className={classes.logo} src={require('../../../assets/img/logo.png')} alt="30 Fingers Store Logo" />
              <div className={classes.titlebox}>
                <p className={classes.topTitle}>30 FINGERS</p>
                <p className={classes.downTitle}>STORE</p>
              </div>
            </div>
          </NavLink>
        </Group>

        <Group className={classes.userLinks}>
          <UserLinks userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        </Group>

        <Burger opened={isOpenBurger} onClick={toggleBurger} className={classes.burger} size="sm" />

        <Transition transition="slide-down" duration={500} mounted={isOpenBurger}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <MenuLinks />
              <UserLinks userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
