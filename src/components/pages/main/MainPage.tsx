import { NavLink } from 'react-router-dom';
import { Container, Group } from '@mantine/core';
import { mainStyle } from './main-style';

const MainPage = () => {
  const { classes } = mainStyle();

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

  const menuLinks = [
    {
      name: 'Login',
      routePath: '/login',
    },
    {
      name: 'Registration',
      routePath: '/registration',
    },
  ];

  const menuItems = menuLinks.map((link) => (
    <NavLink key={link.name} to={link.routePath} className={setActiveLink}>
      {link.name}
    </NavLink>
  ));

  return (
    <Container className={classes.main}>
      <Group className={classes.menuItems}>{menuItems}</Group>
      <Group className={classes.content}></Group>
    </Container>
  );
};

export default MainPage;
