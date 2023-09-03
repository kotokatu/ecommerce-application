import { NavLink } from 'react-router-dom';
import { dropdownStyles } from './dropdownStyles';
import { CategoryType } from '../../../services/api/CategoryCache';

type DropdownLinksProps = {
  name: string;
  links: CategoryType[];
  initiallyOpened?: boolean;
};

const DropdownLinks = ({ name, links }: DropdownLinksProps) => {
  const { classes } = dropdownStyles();

  const linkItems = links.map((link) => (
    <NavLink className={classes.item} key={link.id} to={`/catalog/${link.parentName}/${link.name}`}>
      {link.name}
    </NavLink>
  ));

  return (
    <>
      <NavLink to={`/catalog/${name}`} className={classes.button}>
        {name}
      </NavLink>
      <>{linkItems}</>
    </>
  );
};

export default DropdownLinks;
