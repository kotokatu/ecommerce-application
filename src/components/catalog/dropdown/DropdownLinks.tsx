import { NavLink, useParams } from 'react-router-dom';
import { dropdownStyles } from './dropdownStyles';
import { CategoryType } from '../../../services/api/CategoryCache';
import { minLimitProducts } from '../../../pages/catalog/CatalogPage';

type DropdownLinksProps = {
  name: string;
  links: CategoryType[];
  setLimitProducts: React.Dispatch<React.SetStateAction<number>>;
};

const DropdownLinks = ({ name, links, setLimitProducts }: DropdownLinksProps) => {
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
      onClick={() => setLimitProducts(minLimitProducts)}
    >
      {link.name}
    </NavLink>
  ));

  return (
    <>
      <NavLink
        to={`/catalog/${name}`}
        className={name === category && !subcategory ? `${classes.button} ${classes.active}` : `${classes.button}`}
        onClick={() => setLimitProducts(minLimitProducts)}
      >
        {name}
      </NavLink>
      <>{linkItems}</>
    </>
  );
};

export default DropdownLinks;
