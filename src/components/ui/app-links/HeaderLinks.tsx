import { NavLink } from 'react-router-dom';
import { userService } from '../../../services/UserService/UserService';
import { Dispatch, SetStateAction } from 'react';
import { linksStyle } from './links-style';

type HeaderLinksProps = {
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  userLoggedIn: boolean;
};

const HeaderLinks = ({ userLoggedIn, setUserLoggedIn }: HeaderLinksProps) => {
  const { classes } = linksStyle();

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

  const headerItems = [
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
