import { useEffect, useState } from 'react';
import { createStyles, Center, Loader, Button } from '@mantine/core';
import { useParams, useSearchParams } from 'react-router-dom';
import { storeService } from '../../services/StoreService/StoreService';
import HeaderCatalog from '../../components/catalog/header/HeaderCatalog';
import NavbarCatalog from '../../components/catalog/navbar/NavbarCatalog';
import ProductCard from '../../components/catalog/product-card/ProductCard';
import type { GetProductsReturnType, QueryArgs } from '../../services/StoreService/StoreService';
import { CategoryCache } from '../../services/api/CategoryCache';
import { FilterParams } from '../../services/StoreService/StoreService';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { notificationError } from '../../components/ui/notification';

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
      top: 0,
      left: '-100%',
      zIndex: 5,
      backgroundColor: 'white',
      minHeight: '100vh',
      width: '390px',
      padding: '3rem 2rem 2rem',
      transition: 'left .5s ease 0s',

      '&.active': {
        left: '0',
        height: '80%',
        overflow: 'scroll',
      },
    },
  },
}));

type CatalogPageProps = {
  isOpenNavbar: boolean;
  setIsOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CatalogPage = ({ isOpenNavbar, setIsOpenNavbar, isLoading, setIsLoading }: CatalogPageProps) => {
  const [resources, setResources] = useState<GetProductsReturnType>();
  const [searchParams] = useSearchParams();
  const { category, subcategory } = useParams();
  const { classes } = useStyles();
  const navigate = useNavigate();

  const setQuery = (searchParams: URLSearchParams, hasPrevParams: boolean) => {
    let pathname = '/catalog';
    if (category) pathname += `/${category}`;
    if (subcategory) pathname += `/${subcategory}`;
    navigate({ pathname, search: createSearchParams(searchParams).toString() }, { replace: hasPrevParams });
  };

  const toggleScroll = () => {
    const wrapper = document.querySelector('.wrapper') as HTMLElement;

    setIsOpenNavbar(!isOpenNavbar);
    wrapper.className = !isOpenNavbar ? 'wrapper lock blackout' : 'wrapper';
  };

  useEffect(() => {
    const getCategoryCache = async () => {
      try {
        await categoryCache.get();
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };
    getCategoryCache();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const queryParams: QueryArgs = {};
        const filterParams = [];

        if (category) {
          filterParams.push(
            `categories.id: "${
              subcategory ? categoryCache.getCategoryID(subcategory, category) : categoryCache.getCategoryID(category)
            }"`,
          );
        }

        Object.entries(FilterParams).forEach((param) => {
          if (searchParams.get(param[0])) {
            filterParams.push(`${param[1]}:${searchParams.get(param[0])}`);
          }
        });

        if (filterParams.length) {
          queryParams.filter = filterParams;
          queryParams['filter.facets'] = filterParams;
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
        setResources({ products: [], prices: [], colors: [], sizes: [], brands: [] });
      }
    };

    getProducts();
  }, [category, subcategory, searchParams]);

  const minProductPrice = Number(resources?.prices.sort((a, b) => +a - +b)[0]) / 100;
  const maxProductPrice = Number(resources?.prices.sort((a, b) => +a - +b)[resources.prices.length - 1]) / 100;

  return resources ? (
    <div className={classes.container}>
      <HeaderCatalog allCategories={categoryCache.categories} setQuery={setQuery} />
      <Button variant="outline" size="md" className={classes.button} onClick={toggleScroll}>
        Filters
      </Button>
      <div className={classes.content}>
        <NavbarCatalog
          className={isOpenNavbar ? classes.navbar + ' active' : classes.navbar}
          categories={categoryCache.categories}
          brands={resources.brands}
          sizes={resources.sizes}
          colors={resources.colors}
          minProductPrice={minProductPrice || 0}
          maxProductPrice={maxProductPrice || 10000}
          toggleScroll={toggleScroll}
          setQuery={setQuery}
        />
        <div className={classes.items}>
          {resources.products.length ? (
            resources.products.map((product) => {
              return (
                <ProductCard key={product.id} product={product} isLoading={isLoading} setIsLoading={setIsLoading} />
              );
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
