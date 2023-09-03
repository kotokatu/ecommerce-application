import { createStyles } from '@mantine/core';
import { CategoryType } from '../../../services/api/CategoryCache';
import SortPicker from '../sort-picker/SortPicker';
import SearchInput from '../input/SearchInput';
import BreadCrumbs from '../breadcrumbs/BreadCrumbs';

const headerCatalogStyles = createStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '20px',
    padding: '.7rem 1rem 0',
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
  const { classes } = headerCatalogStyles();

  return (
    <div className={classes.header}>
      <BreadCrumbs allCategories={allCategories} />
      <div className={classes.inputs}>
        <SortPicker />
        <SearchInput label="Search product" placeholder="Enter a name" />
      </div>
    </div>
  );
};

export default HeaderCatalog;
