/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Box, Collapse, UnstyledButton } from '@mantine/core';
import { dropdownStyles } from './dropdownStyles';
import ControlledCheckbox from './ControlledCheckbox';

type DropdownItemsProps = {
  name: string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
};

const DropdownItems = ({ name, items, selectedItems, setSelectedItems }: DropdownItemsProps) => {
  const { classes } = dropdownStyles();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (selectedItems.length !== 0 && !opened) setOpened(true);
  }, [selectedItems]);

  const checkItems = items.map((item) => (
    <ControlledCheckbox item={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} key={item} />
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
