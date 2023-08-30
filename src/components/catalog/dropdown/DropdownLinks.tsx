import { useState } from 'react';
import { Box, Collapse, UnstyledButton } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { dropdownStyles } from './dropdownStyles';

type DropdownLinksProps = {
  name: string;
  links: string[];
  initiallyOpened?: boolean;
};

const DropdownLinks = ({ name, initiallyOpened, links }: DropdownLinksProps) => {
  const { classes } = dropdownStyles();
  const [opened, setOpened] = useState(initiallyOpened || false);

  const linkItems = links.map((link) => (
    <NavLink className={classes.item} key={link} to={`/catalog/${link.toLowerCase()}`}>
      {link}
    </NavLink>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((open) => !open)} className={classes.button}>
        <Box>{name}</Box>
      </UnstyledButton>
      <Collapse in={opened}>{linkItems}</Collapse>
    </>
  );
};

export default DropdownLinks;
