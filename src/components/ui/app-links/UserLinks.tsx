import { NavLink } from 'react-router-dom';
import { userService } from '../../../services/UserService/UserService';
import { Dispatch, SetStateAction } from 'react';
import { linksStyle } from './links-style';

type UserLinksProps = {
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  userLoggedIn: boolean;
};

const UserLinks = ({ userLoggedIn, setUserLoggedIn }: UserLinksProps) => {
  const { classes } = linksStyle();

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

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

  const userItems = userLinks.map((link) =>
    link.isActive ? (
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

  return <>{userItems}</>;
};

export default UserLinks;
