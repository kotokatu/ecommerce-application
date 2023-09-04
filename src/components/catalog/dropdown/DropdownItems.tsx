import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Collapse, UnstyledButton, Checkbox } from '@mantine/core';
import { dropdownStyles } from './dropdownStyles';
import { useSearchParams } from 'react-router-dom';
import ControlledCheckbox from './ControlledCheckbox';

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
    <ControlledCheckbox
      item={item}
      filter={name}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      key={item}
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
