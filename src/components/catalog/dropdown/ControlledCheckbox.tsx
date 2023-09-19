import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Checkbox } from '@mantine/core';
import { dropdownStyles } from './dropdownStyles';

type ControlledCheckboxProps = {
  item: string;
  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
};

const ControlledCheckbox = ({ item, selectedItems, setSelectedItems }: ControlledCheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const { classes } = dropdownStyles();

  useEffect(() => {
    setChecked(selectedItems.includes(item));
  }, [item, selectedItems]);

  return (
    <Checkbox
      className={classes.item}
      label={item}
      checked={checked}
      onChange={(event) => {
        if (event.target.checked) {
          setSelectedItems([...selectedItems, item]);
        } else {
          setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        }
      }}
    />
  );
};

export default ControlledCheckbox;
