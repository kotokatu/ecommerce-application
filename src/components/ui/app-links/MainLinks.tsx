import { NavLink } from 'react-router-dom';
import { linksStyle } from './links-style';
import { notificationWarning } from '../notification';

type MainLinksProps = {
  userLoggedIn: boolean;
};
const MainLinks = ({ userLoggedIn }: MainLinksProps) => {
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
    <NavLink
      key={link.name}
      to={link.routePath}
      className={classes.mainLink}
      onClick={() => {
        if (userLoggedIn && (link.name === 'Login' || link.name === 'Registration')) {
          notificationWarning('You are already logged in');
        }
      }}
    >
      {link.name}
    </NavLink>
  ));

  return <>{mainLinks}</>;
};

export default MainLinks;
