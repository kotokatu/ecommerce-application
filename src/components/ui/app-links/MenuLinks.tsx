import { NavLink } from 'react-router-dom';
import { linksStyle } from './links-style';

const MenuLinks = () => {
  const { classes } = linksStyle();

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

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

  const menuItems = menuLinks.map((link) => (
    <NavLink key={link.name} to={link.routePath} className={setActiveLink}>
      {link.name}
    </NavLink>
  ));

  return <>{menuItems}</>;
};

export default MenuLinks;
