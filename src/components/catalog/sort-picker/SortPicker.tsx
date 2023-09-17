import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createStyles, rem, Select } from '@mantine/core';
import { minLimitProducts } from '../../../pages/catalog/CatalogPage';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
  },

  label: {
    position: 'absolute',
    top: rem(-21),
    fontSize: theme.fontSizes.xs,
    fontWeight: 500,
    transition: 'all 150ms ease',
  },

  item: {
    width: '220px',
    height: '36px',

    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: theme.colors.teal[1],
        color: theme.colors.teal[9],
      },
    },
  },
}));

const sortData = [
  {
    value: 'price asc',
    label: 'Price: low to high',
  },
  {
    value: 'price desc',
    label: 'Price: high to low',
  },
  {
    value: 'name.en-us asc',
    label: 'Name: alphabetically',
  },
];

type SortPickerProps = {
  setQuery: (searchParams: URLSearchParams, hasPrevParams: boolean) => void;
  setLimitProducts: React.Dispatch<React.SetStateAction<number>>;
};

const SortPicker = ({ setQuery, setLimitProducts }: SortPickerProps) => {
  const { classes } = useStyles();
  const [sortValue, setSortValue] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sortValue = searchParams.get('sort');
    setSortValue(sortValue);
  }, [searchParams]);

  return (
    <div className={classes.container}>
      {sortValue ? <span className={classes.label}>Sort by</span> : null}
      <Select
        placeholder="Sort by"
        data={sortData}
        value={sortValue}
        onChange={(value: string) => {
          const hasPrevParams = searchParams.size !== 0;
          searchParams.set('sort', value);
          setQuery(searchParams, hasPrevParams);
          setLimitProducts(minLimitProducts);
        }}
        className={classes.item}
      />
    </div>
  );
};

export default SortPicker;
