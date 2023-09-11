import { NavLink, useParams } from 'react-router-dom';
import { dropdownStyles } from './dropdownStyles';
import { CategoryType } from '../../../services/api/CategoryCache';

type DropdownLinksProps = {
  name: string;
  links: CategoryType[];
};

const DropdownLinks = ({ name, links }: DropdownLinksProps) => {
  const { classes } = dropdownStyles();
  const { category, subcategory } = useParams();

  const linkItems = links.map((link) => (
    <NavLink
      className={
        link.name === subcategory && link.parentName === category
          ? `${classes.item} ${classes.active}`
          : `${classes.item}`
      }
      key={link.id}
      to={`/catalog/${link.parentName}/${link.name}`}
    >
      {link.name}
    </NavLink>
  ));

  return (
    <>
      <NavLink
        to={`/catalog/${name}`}
        className={name === category && !subcategory ? `${classes.button} ${classes.active}` : `${classes.button}`}
      >
        {name}
      </NavLink>
      <>{linkItems}</>
    </>
  );
};

export default DropdownLinks;
