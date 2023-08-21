import { NavLink } from 'react-router-dom';
import { linksStyle } from './links-style';

const MainLinks = () => {
  const { classes } = linksStyle();

  const mainItems = [
    {
      name: 'Catalog',
      routePath: '/catalog',
    },
    {
      name: 'About',
      routePath: '/about',
    },
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

  const mainLinks = mainItems.map((link) => (
    <NavLink key={link.name} to={link.routePath} className={classes.mainLink}>
      {link.name}
    </NavLink>
  ));

  return <>{mainLinks}</>;
};

export default MainLinks;
