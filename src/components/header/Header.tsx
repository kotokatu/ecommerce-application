import { Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { headerStyle } from './header-style';
import Basket from '../app-links/Basket';
import MenuLinks from '../app-links/MenuLinks';
import UserLinks from '../app-links/UserLinks';

type HeaderProps = {
  isOpenBurger: boolean;
  toggleBurger: () => void;
};

export function AppHeader({ isOpenBurger, toggleBurger }: HeaderProps) {
  const wrapper = document.querySelector('.wrapper') as HTMLElement;
  const { classes } = headerStyle();

  function toggleScroll() {
    if (wrapper) {
      wrapper.className = isOpenBurger ? 'wrapper lock' : 'wrapper';
    }
  }

  return (
    <Header height={80} className={classes.header}>
      <Container className={classes.container}>
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

        <Group className={classes.menuLinks}>
          <MenuLinks />
        </Group>

        <Group className={classes.userLinks}>
          <UserLinks />
          <Basket />
        </Group>

        <Burger opened={isOpenBurger} onClick={toggleBurger} className={classes.burger} size="md" />

        <Transition
          transition="slide-left"
          duration={500}
          mounted={isOpenBurger}
          onEnter={toggleScroll}
          onExited={toggleScroll}
        >
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <MenuLinks />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
