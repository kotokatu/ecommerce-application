import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { createStyles } from '@mantine/core';
import { CategoryType } from '../../../pages/catalog/CatalogPage';
import SortPicker from '../sort-picker/SortPicker';
import SearchInput from '../input/SearchInput';
import BreadCrumbs from '../breadcrumbs/BreadCrumbs';
import { ProductProjection } from '@commercetools/platform-sdk';

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
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[]>>;
};

const HeaderCatalog = ({ allCategories, setProducts }: HeaderCatalogProps) => {
  const { classes } = headerCatalogStyles();
  const [searchValue, setSearchValue] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const setSearchQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('search', searchValue);
    navigate('/catalog?' + searchParams.toString());
  };

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    setSearchValue(searchQuery || '');
  }, [searchParams]);

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
          searchProduct={setSearchQuery}
        />
      </div>
    </div>
  );
};

export default HeaderCatalog;
