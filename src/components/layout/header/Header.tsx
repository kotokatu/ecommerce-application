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
            <img className={classes.logo} src={require('../../../assets/img/logo.jpg')} alt="" />
          </NavLink>
        </Group>

        <Group className={classes.userLinks}>
          <UserLinks userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        </Group>

        <Burger opened={isOpenBurger} onClick={toggleBurger} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={isOpenBurger}>
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
