import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Collapse, UnstyledButton } from '@mantine/core';
import { NavLink, useParams } from 'react-router-dom';
import { dropdownStyles } from './dropdownStyles';
import { CategoryType } from '../../../pages/catalog/CatalogPage';
import { ProductProjection } from '@commercetools/platform-sdk';
import { productService } from '../../../services/ProductService/ProductService';

type DropdownLinksProps = {
  name: string;
  links: CategoryType[];
  initiallyOpened?: boolean;
  setProducts: Dispatch<SetStateAction<ProductProjection[]>>;
};

const DropdownLinks = ({ name, initiallyOpened, links, setProducts }: DropdownLinksProps) => {
  const { classes } = dropdownStyles();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const { category } = useParams();

  const getProductsById = async (id: string) => {
    const params = {
      filter: `categories.id: "${id}"`,
    };
    const responseProducts = await productService.searchProducts(params);
    const resultProducts = responseProducts?.body.results as ProductProjection[];

    setProducts(resultProducts);
  };

  const linkItems = links.map((link) => (
    <NavLink
      className={classes.item}
      key={link.id}
      to={`/catalog/category/${category ? category : link.id}/${category ? link.id : ''}`}
      onClick={() => getProductsById(link.id)}
    >
      {link.name}
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
