import { createStyles } from '@mantine/core';
import { CategoryType } from '../../../services/api/CategoryCache';
import SortPicker from '../sort-picker/SortPicker';
import SearchInput from '../input/SearchInput';
import BreadCrumbs from '../breadcrumbs/BreadCrumbs';

const headerCatalogStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '20px',
    padding: '.7rem 1rem 0',
    gap: '8px',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: '1rem 0 0 0',
      padding: 0,
    },
  },

  inputs: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',

    '& input': {
      width: '220px',
    },

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
      gap: '26px',
    },
  },
}));

type HeaderCatalogProps = {
  allCategories: CategoryType[];
  setQuery: (searchParams: URLSearchParams, hasPrevParams: boolean) => void;
};

const HeaderCatalog = ({ allCategories, setQuery }: HeaderCatalogProps) => {
  const { classes } = headerCatalogStyles();

  return (
    <div className={classes.header}>
      <BreadCrumbs allCategories={allCategories} />
      <div className={classes.inputs}>
        <SortPicker setQuery={setQuery} />
        <SearchInput label="Search product" placeholder="Enter a name" setQuery={setQuery} />
      </div>
    </div>
  );
};

export default HeaderCatalog;
