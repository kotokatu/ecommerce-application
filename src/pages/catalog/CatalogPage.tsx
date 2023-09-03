import { useEffect, useState } from 'react';
import { createStyles, Center, Loader } from '@mantine/core';
import { useParams, useSearchParams } from 'react-router-dom';
import { productService } from '../../services/ProductService/ProductService';
import HeaderCatalog from '../../components/catalog/header/HeaderCatalog';
import NavbarCatalog from '../../components/catalog/navbar/NavbarCatalog';
import ProductCard from '../../components/catalog/product-card/ProductCard';
import type { GetProductsReturnType, QueryArgs } from '../../services/ProductService/ProductService';
import { notificationError } from '../../components/ui/notification';
import { CategoryCache } from '../../services/api/CategoryCache';
import type { CategoryType } from '../../services/api/CategoryCache';

export const categoryCache = new CategoryCache();

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
  const [categories, setCategories] = useState<string[]>([]);
  const [resources, setResources] = useState<GetProductsReturnType>();
  const [filters, setFilters] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const { category, subcategory } = useParams();
  const { classes } = useStyles();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const queryParams: QueryArgs = {};
        const searchQuery = searchParams.get('search');

        if (category) {
          queryParams.filter = [`categories.id: "${subcategory || category}"`];
          queryParams['filter.facets'] = [`categories.id: "${subcategory || category}"`];
        }

        if (filters.length) {
          queryParams.filter = filters;
          queryParams['filter.facets'] = filters;
        }

        if (searchQuery !== null) {
          queryParams['text.en-US'] = `${searchQuery}`;
          queryParams.fuzzy = true;
        }

        const res = await productService.getProducts(queryParams);

        if (!res) return;

        setResources(res);
        setCategories(res.categories);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };

    getProducts();
  }, [category, subcategory, searchParams, filters]);

  const allCategories = categoryCache.categories.filter((cachedCategory) => {
    return categories.includes(cachedCategory.id);
  });

  const currentCategories = categoryCache.categories
    .filter((cachedCategory) => categories.includes(cachedCategory.id))
    .filter((cachedCategory) => {
      return cachedCategory.parentID === category;
    });

  const minProductPrice = Number(resources?.prices.sort((a, b) => +a - +b)[0]) / 100;
  const maxProductPrice = Number(resources?.prices.sort((a, b) => +a - +b)[resources.prices.length - 1]) / 100;

  return resources ? (
    <div className={classes.container}>
      <HeaderCatalog allCategories={allCategories} />
      <div className={classes.content}>
        <NavbarCatalog
          categories={currentCategories as CategoryType[]}
          brands={resources.brands}
          sizes={resources.sizes}
          colors={resources.colors}
          minProductPrice={minProductPrice || 0}
          maxProductPrice={maxProductPrice || 10000}
          setFilters={setFilters}
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
