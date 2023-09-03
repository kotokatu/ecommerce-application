import { NavLink } from 'react-router-dom';
import { userService } from '../../services/UserService/UserService';
import { linksStyle } from './links-style';
import useAuth from '../../utils/hooks/useAuth';

const HeaderLinks = () => {
  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const { classes } = linksStyle();

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

  const headerItems = [
    {
      name: 'Catalog',
      routePath: '/catalog',
      isDisplay: true,
    },
    {
      name: 'About',
      routePath: '/about',
      isDisplay: true,
    },
    {
      name: 'Login',
      routePath: '/login',
      isDisplay: !userLoggedIn,
    },
    {
      name: 'Logout',
      routePath: '/login',
      isDisplay: userLoggedIn,
    },
    {
      name: 'Registration',
      routePath: '/registration',
      isDisplay: !userLoggedIn,
    },
    {
      name: 'Profile',
      routePath: '/profile',
      isDisplay: userLoggedIn,
    },
    {
      name: 'Basket',
      routePath: '/basket',
      isDisplay: true,
    },
  ];

  const headerLinks = headerItems.map((link) =>
    link.isDisplay ? (
      <NavLink
        key={link.name}
        to={link.routePath}
        className={link.name !== 'Logout' ? setActiveLink : classes.link}
        onClick={() => {
          if (link.name === 'Logout') {
            setUserLoggedIn(false);
            userService.logout();
          }
        }}
      >
        {link.name}
      </NavLink>
    ) : null,
  );

  return <>{headerLinks}</>;
};

export default HeaderLinks;
