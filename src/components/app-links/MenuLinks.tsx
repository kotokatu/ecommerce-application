import { NavLink } from 'react-router-dom';
import { linksStyle } from './links-style';

const MenuLinks = () => {
  const { classes } = linksStyle();

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.link} ${classes.linkActive}` : classes.link;
  }

  const menuItems = [
    {
      name: 'Catalog',
      routePath: '/catalog',
    },
    {
      name: 'About',
      routePath: '/about',
    },
  ];

  return (
    <>
      {menuItems.map((link) => (
        <NavLink key={link.name} to={link.routePath} className={setActiveLink}>
          {link.name}
        </NavLink>
      ))}
    </>
  );
};

export default MenuLinks;
