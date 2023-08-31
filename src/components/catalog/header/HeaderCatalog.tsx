import { useState } from 'react';
import SearchInput from '../input/SearchInput';
import SortPicker from '../sort-picker/SortPicker';
import { NavLink } from 'react-router-dom';
import { createStyles } from '@mantine/core';

const headerCatalogStyles = createStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '20px',
    padding: '0 1rem',
  },

  links: {
    display: 'flex',
    gap: '10px',
  },

  link: {
    '&:not(:last-child)::after': {
      content: '">"',
      marginLeft: '10px',
    },
  },

  inputs: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },
}));

const breadCrumbs = ['catalog', 'men', 'tops'];

const HeaderCatalog = () => {
  const [searchValue, setSearchValue] = useState('');
  const { classes } = headerCatalogStyles();

  function searchProduct() {
    console.log(searchValue);
  }

  return (
    <div className={classes.header}>
      <div className={classes.links}>
        {breadCrumbs.map((item, index) => (
          <NavLink className={classes.link} key={item + index} to={`/${item}`}>
            {item ? item.toUpperCase() : ''}
          </NavLink>
        ))}
      </div>
      <div className={classes.inputs}>
        <SortPicker />
        <SearchInput
          label="Search product"
          placeholder="Enter a name"
          value={searchValue}
          setValue={setSearchValue}
          searchProduct={searchProduct}
        />
      </div>
    </div>
  );
};

export default HeaderCatalog;
