import { NavLink } from 'react-router-dom';
import { storeService } from '../../services/StoreService/StoreService';
import { linksStyle } from './links-style';
import useAuth from '../../utils/hooks/useAuth';
import { PiUser } from 'react-icons/pi';
import { Popover } from '@mantine/core';

const UserLinks = () => {
  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const { classes } = linksStyle();

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

  const userItems = [
    {
      name: 'Login',
      routePath: '/login',
      isDisplay: !userLoggedIn,
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
      name: 'Logout',
      routePath: '/login',
      isDisplay: userLoggedIn,
    },
  ];

  const userLinks = userItems.map((link) =>
    link.isDisplay ? (
      <NavLink
        key={link.name}
        to={link.routePath}
        className={link.name !== 'Logout' ? setActiveLink : classes.link}
        onClick={() => {
          if (link.name === 'Logout') {
            setUserLoggedIn(false);
            storeService.logoutUser();
          }
        }}
      >
        {link.name}
      </NavLink>
    ) : null,
  );

  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <div className={classes.user}>
          <PiUser size="1.5rem" />
        </div>
      </Popover.Target>
      <Popover.Dropdown>{userLinks}</Popover.Dropdown>
    </Popover>
  );
};

export default UserLinks;
