import { NavLink } from 'react-router-dom';
import { Container, Group } from '@mantine/core';
import { mainStyle } from './main-style';
import MenuLinks from '../../ui/app-links/MenuLinks';

const MainPage = () => {
  const { classes } = mainStyle();

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

  const userLinks = [
    {
      name: 'Login',
      routePath: '/login',
    },
    {
      name: 'Registration',
      routePath: '/registration',
    },
    {
      name: 'Basket',
      routePath: '/basket',
    },
  ];

  const userItems = userLinks.map((link) => (
    <NavLink key={link.name} to={link.routePath} className={setActiveLink}>
      {link.name}
    </NavLink>
  ));

  return (
    <Container className={classes.main}>
      <Group className={classes.menuItems}>
        <MenuLinks />
        {userItems}
      </Group>
      <Group className={classes.content}></Group>
    </Container>
  );
};

export default MainPage;
