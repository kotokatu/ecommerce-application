import { Dispatch, SetStateAction, useState } from 'react';
import SearchInput from '../input/SearchInput';
import SortPicker from '../sort-picker/SortPicker';
import { NavLink } from 'react-router-dom';
import { Breadcrumbs, createStyles } from '@mantine/core';
import { productService } from '../../../services/ProductService/ProductService';
import { ProductProjection } from '@commercetools/platform-sdk';
import BreadCrumbs from '../breadcrumbs/BreadCrumbs';
import { CategoryType } from '../../../pages/catalog/CatalogPage';

const headerCatalogStyles = createStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '20px',
    padding: '0 1rem',
  },

  inputs: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },
}));

type BreadCrumbsType = {
  name: string;
  id: string;
  params: Record<string, string>;
};

//example

// const breadCrumbs = [
//   {
//     name: 'men',
//     link: '/c25a54f7-7e48-462c-985b-3b0352b611fb',
//     id: 'c25a54f7-7e48-462c-985b-3b0352b611fb',
//     params: {
//       filter: 'categories.id: "c25a54f7-7e48-462c-985b-3b0352b611fb"',
//     },
//   },
//   {
//     name: 'tops',
//     link: '/c25a54f7-7e48-462c-985b-3b0352b611fb/604aa293-39b1-402f-bb95-690c75a0bac5',
//     id: '604aa293-39b1-402f-bb95-690c75a0bac5',
//     params: {
//       filter: 'categories.id: "604aa293-39b1-402f-bb95-690c75a0bac5"',
//     },
//   },
// ];

const HeaderCatalog = ({ allCategories }: { allCategories: CategoryType[] }) => {
  const [searchValue, setSearchValue] = useState('');
  const { classes } = headerCatalogStyles();

  function searchProduct() {
    console.log(searchValue);
  }

  // const getProductsById = async (params: Record<string, string>) => {
  //   const responseProducts = await productService.searchProducts(params);
  //   const resultProducts = responseProducts?.body.results as ProductProjection[];

  //   setProducts(resultProducts);
  // };

  // const getAllProducts = async () => {
  //   const responseProducts = await productService.getProducts();
  //   const resultProducts = responseProducts?.body.results as ProductProjection[];

  //   setProducts(resultProducts);
  // };

  return (
    <div className={classes.header}>
      <BreadCrumbs allCategories={allCategories} />
      {/* <NavLink className={classes.link} to={`/catalog`} onClick={() => getAllProducts()}>
          CATALOG
        </NavLink>
        {breadCrumbs.map((item) => (
          <NavLink
            className={classes.link}
            key={item.id}
            to={`/catalog/category/${item.id}`}
            onClick={() => getProductsById(item.params)}
          >
            {item.name.toUpperCase()}
          </NavLink>
        ))} */}
      <div className={classes.inputs}>
        <SortPicker />
        <SearchInput
          label="Search product"
          placeholder="Enter a name"
          value={searchValue}
          setValue={setSearchValue}
          searchProduct={searchProduct}
        />
      </div>
    </div>
  );
};

export default HeaderCatalog;
