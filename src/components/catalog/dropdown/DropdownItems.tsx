import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Collapse, UnstyledButton, Checkbox } from '@mantine/core';
import { dropdownStyles } from './dropdownStyles';

type DropdownItemsProps = {
  name: string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  initiallyOpened?: boolean;
};

const DropdownItems = ({ name, items, initiallyOpened, selectedItems, setSelectedItems }: DropdownItemsProps) => {
  const { classes } = dropdownStyles();
  const [opened, setOpened] = useState(initiallyOpened || false);

  const checkItems = items.map((item) => (
    <Checkbox
      className={classes.item}
      key={item}
      label={item}
      onChange={(event) => {
        if (event.target.checked) {
          setSelectedItems([...selectedItems, item]);
        } else {
          setSelectedItems(selectedItems.filter((brand) => brand !== item));
        }
      }}
    />
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((open) => !open)} className={classes.button}>
        <Box>{name}</Box>
      </UnstyledButton>
      <Collapse in={opened} className={classes.container}>
        {checkItems}
      </Collapse>
    </>
  );
};

export default DropdownItems;
