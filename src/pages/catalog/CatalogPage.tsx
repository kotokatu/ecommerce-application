import { useEffect, useState } from 'react';
import { createStyles, Center, Loader, Button } from '@mantine/core';
import { useParams, useSearchParams } from 'react-router-dom';
import { storeService } from '../../services/StoreService/StoreService';
import HeaderCatalog from '../../components/catalog/header/HeaderCatalog';
import NavbarCatalog from '../../components/catalog/navbar/NavbarCatalog';
import ProductCard from '../../components/catalog/product-card/ProductCard';
import type { GetProductsReturnType, QueryArgs } from '../../services/StoreService/StoreService';
import { notificationError } from '../../components/ui/notification';
import { CategoryCache } from '../../services/api/CategoryCache';

export const categoryCache = new CategoryCache();

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0 1rem',

    [theme.fn.smallerThan('md')]: {
      alignItems: 'center',
    },
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

  button: {
    display: 'none',

    [theme.fn.smallerThan('md')]: {
      display: 'block',
      margin: '1rem 0',
      width: '220px',
      position: 'relative',
    },
  },

  navbar: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginRight: '10px',
    borderRight: '0.0625rem solid #e9ecef',
    width: '260px',
    minWidth: '260px',

    [theme.fn.smallerThan('md')]: {
      position: 'absolute',
      top: 80,
      left: '-100%',
      zIndex: 1,
      backgroundColor: 'white',
      minHeight: '100vh',
      width: '100%',
      padding: '2rem',
      overflow: 'hidden',
      transition: 'left .5s ease 0s',
    },

    '&.active': {
      left: '0',
    },
  },
}));

const CatalogPage = ({ isOpenBurger }: { isOpenBurger: boolean }) => {
  const [resources, setResources] = useState<GetProductsReturnType>();
  const [filters, setFilters] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(true);
  const { category, subcategory } = useParams();
  const { classes } = useStyles();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const queryParams: QueryArgs = {};
        await categoryCache.get();

        if (category) {
          queryParams.filter = [
            `categories.id: "${
              subcategory ? categoryCache.getCategoryID(subcategory, category) : categoryCache.getCategoryID(category)
            }"`,
          ];
          queryParams['filter.facets'] = [
            `categories.id: "${
              subcategory ? categoryCache.getCategoryID(subcategory, category) : categoryCache.getCategoryID(category)
            }"`,
          ];
        }

        if (filters.length) {
          queryParams.filter = filters;
          queryParams['filter.facets'] = filters;
        }

        const searchQuery = searchParams.get('search');
        if (searchQuery !== null) {
          queryParams['text.en-US'] = `${searchQuery}`;
          queryParams.fuzzy = true;
        }

        const sortOrder = searchParams.get('sort');
        if (sortOrder) {
          queryParams.sort = sortOrder;
        }

        const res = await storeService.getProducts(queryParams);

        if (!res) return;

        setResources(res);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };

    getProducts();
  }, [category, subcategory, searchParams, filters]);

  const minProductPrice = Number(resources?.prices.sort((a, b) => +a - +b)[0]) / 100;
  const maxProductPrice = Number(resources?.prices.sort((a, b) => +a - +b)[resources.prices.length - 1]) / 100;

  return resources ? (
    <div className={classes.container}>
      <HeaderCatalog allCategories={categoryCache.categories} />
      <Button variant="outline" size="md" className={classes.button} onClick={() => setIsOpenNavbar(!isOpenNavbar)}>
        Filters
      </Button>
      <div className={classes.content}>
        <NavbarCatalog
          className={isOpenNavbar && !isOpenBurger ? classes.navbar + ' active' : classes.navbar}
          categories={categoryCache.categories}
          brands={resources.brands}
          sizes={resources.sizes}
          colors={resources.colors}
          minProductPrice={minProductPrice || 0}
          maxProductPrice={maxProductPrice || 10000}
          setFilters={setFilters}
          isOpenNavbar={isOpenNavbar}
          setIsOpenNavbar={setIsOpenNavbar}
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
