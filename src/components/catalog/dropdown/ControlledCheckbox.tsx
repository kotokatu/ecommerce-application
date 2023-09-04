import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Checkbox } from '@mantine/core';
import { dropdownStyles } from './dropdownStyles';

type ControlledCheckboxProps = {
  item: string;
  filter: string;
  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
};

const ControlledCheckbox = ({ item, filter, selectedItems, setSelectedItems }: ControlledCheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { classes } = dropdownStyles();

  useEffect(() => {
    const brandsQuery = searchParams.get(filter.toLowerCase());
    if (brandsQuery) {
      setChecked(brandsQuery.includes(item));
    }
  }, [filter, item, searchParams]);

  return (
    <Checkbox
      className={classes.item}
      label={item}
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
        if (checked) {
          searchParams.append(filter.toLowerCase(), item);
          setSearchParams(searchParams);
        } else {
          setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        }
      }}
    />
  );
};

export default ControlledCheckbox;
