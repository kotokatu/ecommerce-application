import { useEffect, useState } from 'react';
import { Category, ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { createStyles, Button } from '@mantine/core';
import { useParams, useSearchParams } from 'react-router-dom';
import { FilterParams, productService } from '../../services/ProductService/ProductService';
import HeaderCatalog from '../../components/catalog/header/HeaderCatalog';
import NavbarCatalog from '../../components/catalog/navbar/NavbarCatalog';
import ProductCard from '../../components/catalog/product-card/ProductCard';
import type { QueryArgs } from '../../services/ProductService/ProductService';
import { notificationError } from '../../components/ui/notification';

export type CategoryType = {
  name: string;
  id: string;
};

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  items: {
    flex: '1 1 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px',
  },

  center: {
    marginTop: '100px',
  },
}));

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [filters, setFilters] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const { category, subcategory } = useParams();
  const { classes } = useStyles();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = (await productService.getCategories()) as Category[];
        setCategories(categories);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };

    const getProducts = async () => {
      try {
        let queryParams: QueryArgs = {};
        const searchQuery = searchParams.get('search');

        if (category) {
          queryParams.filter = `categories.id: "${subcategory || category}"`;
        }

        // if (filters) {
        //   queryParams.filter = filters;
        //   queryParams['filter.facets'] = filters;
        // }

        if (searchQuery) {
          queryParams = { 'text.en-US': `${searchQuery}`, fuzzy: true };
        }

        const res = await productService.getProducts(queryParams);

        if (!res) return;

        const { categories, brands, colors, sizes, prices, products } = res;
        console.log(categories);
        console.log(brands);
        console.log(colors);
        console.log(sizes);
        console.log(prices);
        setProducts(products);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };

    getProducts();
    getCategories();
  }, [category, subcategory, searchParams /* filters */]);

  const brands: string[] = [];
  const sizes: string[] = [];
  const colors: string[] = [];
  const prices: number[] = [0, 10000];
  const currentCategories: CategoryType[] = [];
  const allCategories: CategoryType[] = [];

  categories.forEach((categoryFromAPI) => {
    allCategories.push({ name: categoryFromAPI.name['en-US'], id: categoryFromAPI.id });
  });

  categories.forEach((categoryFromAPI) => {
    if (!categoryFromAPI.parent && !category) {
      currentCategories.push({ name: categoryFromAPI.name['en-US'], id: categoryFromAPI.id });
    }
    if (categoryFromAPI.parent && category) {
      if (categoryFromAPI.parent.obj?.id === category) {
        currentCategories.push({ name: categoryFromAPI.name['en-US'], id: categoryFromAPI.id });
      }
    }
  });

  function fillAtributeArrays(array: ProductVariant) {
    array.attributes?.forEach((attribute) => {
      switch (attribute.name) {
        case 'brand':
          if (!brands.includes(attribute.value.label)) brands.push(attribute.value.label);
          break;
        case 'size':
          if (!sizes.includes(attribute.value.label)) sizes.push(attribute.value.label);
          break;
        case 'color':
          if (!colors.includes(attribute.value.label)) colors.push(attribute.value.label);
          break;
      }
    });
  }

  products.forEach((product) => {
    fillAtributeArrays(product.masterVariant);
    product.variants.forEach((product) => {
      fillAtributeArrays(product);
    });
  });

  products.forEach((product) => {
    product.masterVariant.prices?.forEach((price) => {
      if (!prices.includes(price.value.centAmount / 100)) prices.push(price.value.centAmount / 100);
    });
  });

  const minProductPrice = Math.min(...prices);
  const maxProductPrice = Math.max(...prices);

  return (
    <div className={classes.container}>
      <HeaderCatalog allCategories={allCategories} />
      <div className={classes.content}>
        <NavbarCatalog
          categories={currentCategories}
          brands={brands}
          sizes={sizes}
          colors={colors}
          minProductPrice={minProductPrice}
          maxProductPrice={maxProductPrice}
        />
        {/* <Button onClick={() => setFilters([`${FilterParams.brand}:"Palm Angels","Jacquemus"`])}></Button> */}
        <div className={classes.items}>
          {products.length ? (
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })
          ) : (
            <h2 className={classes.center}>Product not found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
