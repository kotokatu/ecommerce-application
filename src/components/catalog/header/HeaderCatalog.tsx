import { useState } from 'react';
import { createStyles } from '@mantine/core';
import { CategoryType } from '../../../pages/catalog/CatalogPage';
import SortPicker from '../sort-picker/SortPicker';
import SearchInput from '../input/SearchInput';
import BreadCrumbs from '../breadcrumbs/BreadCrumbs';

const headerCatalogStyles = createStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '20px',
    padding: '0 1rem',
  },

  inputs: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },
}));

type HeaderCatalogProps = {
  allCategories: CategoryType[];
};

const HeaderCatalog = ({ allCategories }: HeaderCatalogProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { classes } = headerCatalogStyles();

  const searchProduct = async () => {
    const searchedProducts = await productService.searchProducts({ where: `${searchValue}` });
    console.log(searchedProducts);
  };

  return (
    <div className={classes.header}>
      <BreadCrumbs allCategories={allCategories} />
      <div className={classes.inputs}>
        <SortPicker />
        <SearchInput
          label="Search product"
          placeholder="Enter a name"
          value={searchValue}
          setValue={setSearchValue}
          searchProduct={() => searchProduct()}
        />
      </div>
    </div>
  );
};

export default HeaderCatalog;
