import { useEffect, useState } from 'react';
import { Category, ProductVariant } from '@commercetools/platform-sdk';
import { createStyles, Button, Center, Loader } from '@mantine/core';
import { useParams, useSearchParams } from 'react-router-dom';
import { FilterParams, productService } from '../../services/ProductService/ProductService';
import HeaderCatalog from '../../components/catalog/header/HeaderCatalog';
import NavbarCatalog from '../../components/catalog/navbar/NavbarCatalog';
import ProductCard from '../../components/catalog/product-card/ProductCard';
import type { GetProductsReturnType, QueryArgs } from '../../services/ProductService/ProductService';
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<GetProductsReturnType>();
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
          queryParams.filter = [`categories.id: "${subcategory || category}"`];
          queryParams['filter.facets'] = [`categories.id: "${subcategory || category}"`];
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

        setResources(res);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };

    getProducts();
    getCategories();
  }, [category, subcategory, searchParams /* filters */]);

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

  const minProductPrice = Number(resources?.prices.sort((a, b) => +a - +b)[0]) / 100;
  const maxProductPrice = Number(resources?.prices.sort((a, b) => +a - +b)[resources.prices.length - 1]) / 100;

  return resources ? (
    <div className={classes.container}>
      <HeaderCatalog allCategories={allCategories} />
      <div className={classes.content}>
        <NavbarCatalog
          categories={currentCategories}
          brands={resources.brands}
          sizes={resources.sizes}
          colors={resources.colors}
          minProductPrice={minProductPrice || 0}
          maxProductPrice={maxProductPrice || 10000}
        />
        <div className={classes.items}>
          {resources.products.length ? (
            resources.products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })
          ) : (
            <h2 className={classes.center}>Product not found</h2>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Center h="100%">
      <Loader variant="bars" size="xl" display="block" mx="auto" />
    </Center>
  );
};

export default CatalogPage;
