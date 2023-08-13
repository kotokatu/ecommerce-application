import { Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import { headerStyle } from './header-style';

type HeaderProps = {
  onSignIn: Dispatch<SetStateAction<boolean>>;
  userLoggedIn: boolean;
};

export function AppHeader({ onSignIn, userLoggedIn }: HeaderProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = headerStyle();

  const menuLinks = [
    {
      name: 'Catalog',
      routePath: '/catalog',
    },
    {
      name: 'About',
      routePath: '/about',
    },
  ];

  const userLinks = [
    {
      name: 'Login',
      routePath: '/login',
      isActive: !userLoggedIn,
    },
    {
      name: 'Logout',
      routePath: '/login',
      isActive: userLoggedIn,
    },
    {
      name: 'Registration',
      routePath: '/registration',
      isActive: !userLoggedIn,
    },
    {
      name: 'Profile',
      routePath: '/profile',
      isActive: userLoggedIn,
    },
    {
      name: 'Basket',
      routePath: '/basket',
      isActive: true,
    },
  ];

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

  const menuItems = menuLinks.map((link) => (
    <NavLink key={link.name} to={link.routePath} className={setActiveLink}>
      {link.name}
    </NavLink>
  ));

  const userItems = userLinks.map((link) =>
    link.isActive ? (
      <NavLink
        key={link.name}
        to={link.routePath}
        className={setActiveLink}
        onClick={() => {
          if (link.name === 'Logout') {
            onSignIn(false);
          }
        }}
      >
        {link.name}
      </NavLink>
    ) : undefined,
  );

  return (
    <Header height={80} className={classes.root}>
      <Container className={classes.header}>
        <Group className={classes.title}>
          <NavLink to="/">30 Fingers Store</NavLink>
        </Group>

        <Group className={classes.menuLinks}>{menuItems}</Group>

        <Group className={classes.userLinks}>{userItems}</Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {menuItems}
              {userItems}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
