import { useState } from 'react';
import { createStyles, rem, Select } from '@mantine/core';

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

const SortPicker = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className={classes.container}>
      {value ? <span className={classes.label}>Sort by</span> : null}
      <Select
        placeholder="Sort by"
        data={['Price: high to low', 'Price: low to high', 'Name: alphabetically']}
        onChange={setValue}
        className={classes.item}
      />
    </div>
  );
};

export default SortPicker;
