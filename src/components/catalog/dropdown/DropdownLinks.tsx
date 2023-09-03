import { useState } from 'react';
import { Box, Collapse, UnstyledButton } from '@mantine/core';
import { Link, NavLink } from 'react-router-dom';
import { dropdownStyles } from './dropdownStyles';
import { CategoryType } from '../../../services/api/CategoryCache';

type DropdownLinksProps = {
  name: string;
  links: CategoryType[];
  initiallyOpened?: boolean;
};

const DropdownLinks = ({ name, initiallyOpened, links }: DropdownLinksProps) => {
  const { classes } = dropdownStyles();
  const [opened, setOpened] = useState(initiallyOpened || false);

  const linkItems = links.map((link) => (
    <NavLink className={classes.item} key={link.id} to={`/catalog/${link.parentName}/${link.name}`}>
      {link.name}
    </NavLink>
  ));

  return (
    <>
      <UnstyledButton
        component={Link}
        to={`/catalog/${name}`}
        onClick={() => setOpened((open) => !open)}
        className={classes.button}
      >
        <Box>{name}</Box>
      </UnstyledButton>
      <Collapse in={opened}>{linkItems}</Collapse>
    </>
  );
};

export default DropdownLinks;
