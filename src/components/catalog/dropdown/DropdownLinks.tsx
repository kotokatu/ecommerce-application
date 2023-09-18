import { NavLink, useParams } from 'react-router-dom';
import { dropdownStyles } from './dropdownStyles';
import { CategoryType } from '../../../services/api/CategoryCache';
import { MIN_LIMIT_PRODUCTS } from '../../../services/StoreService/StoreService';
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
      onClick={() => setLimitProducts(MIN_LIMIT_PRODUCTS)}
    >
      {link.name}
    </NavLink>
  ));

  return (
    <>
      <NavLink
        to={`/catalog/${name}`}
        className={name === category && !subcategory ? `${classes.button} ${classes.active}` : `${classes.button}`}
        onClick={() => setLimitProducts(MIN_LIMIT_PRODUCTS)}
      >
        {name}
      </NavLink>
      <>{linkItems}</>
    </>
  );
};

export default DropdownLinks;
