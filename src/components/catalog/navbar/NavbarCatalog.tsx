/* eslint-disable react-hooks/exhaustive-deps */
import { Button, UnstyledButton, Collapse, createStyles } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import DropdownLinks from '../dropdown/DropdownLinks';
import DropdownPrice from '../dropdown/DropdownPrice';
import DropdownItems from '../dropdown/DropdownItems';
import { CategoryType } from '../../../services/api/CategoryCache';
import { getSearchParams } from '../../../utils/helpers/search-params-helpers';

const navbarCatalogStyles = createStyles((theme) => ({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0 1rem 0 0',

    [theme.fn.smallerThan('md')]: {
      padding: 0,
    },
  },

  button: {
    fontWeight: 500,
    display: 'block',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    width: '100%',
    color: theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },
}));

type NavbarCatalogProps = {
  className: string;
  categories: CategoryType[];
  brands: string[];
  sizes: string[];
  colors: string[];
  minProductPrice: number;
  maxProductPrice: number;
  setQuery: (searchParams: URLSearchParams, hasPrevParams: boolean) => void;
  toggleScroll: () => void;
};

const CLOTHING_SIZES: Record<string, number> = {
  XXS: 0,
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  XXL: 6,
};

const NavbarCatalog = ({
  className,
  categories,
  brands,
  sizes,
  colors,
  minProductPrice,
  maxProductPrice,
  toggleScroll,
  setQuery,
}: NavbarCatalogProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceRange, setPriceRange] = useState([minProductPrice, maxProductPrice]);
  const [opened, setOpened] = useState(false);
  const { category, subcategory } = useParams();
  const { classes } = navbarCatalogStyles();

  const setFilterQuery = () => {
    const hasPrevParams = searchParams.size !== 0;
    selectedBrands.length
      ? searchParams.set('brand', `"${selectedBrands.join('", "')}"`)
      : searchParams.delete('brand');
    selectedSizes.length ? searchParams.set('size', `"${selectedSizes.join('", "')}"`) : searchParams.delete('size');
    selectedColors.length
      ? searchParams.set('color', `"${selectedColors.join('", "')}"`)
      : searchParams.delete('color');
    if (minPrice || maxPrice)
      searchParams.set('price', `range(${Number(minPrice) * 100} to ${Number(maxPrice) * 100})`);
    setQuery(searchParams, hasPrevParams);
  };

  const clearFilterProducts = () => {
    if (searchParams.size !== 0) setSearchParams('');
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice('');
    setMaxPrice('');
    setPriceRange([minProductPrice, maxProductPrice]);
  };

  const getParentCategories = () => {
    return categories.filter((category) => !category.parentID);
  };

  const getChildrenCategories = (categoryName: string) => {
    return categories.filter((category) => category.parentName === categoryName).sort((a, b) => +a.order - +b.order);
  };

  useEffect(() => {
    if (searchParams.size === 0) {
      clearFilterProducts();
    } else {
      setSelectedBrands(() => getSearchParams(searchParams, 'brand'));
      setSelectedSizes(() => getSearchParams(searchParams, 'size'));
      setSelectedColors(() => getSearchParams(searchParams, 'color'));
      setMinPrice(
        () =>
          searchParams
            .get('price')
            ?.match(/\((.*?)\)/)?.[1]
            .split(' to ')[0]
            .slice(0, -2) || '',
      );
      setMaxPrice(
        () =>
          searchParams
            .get('price')
            ?.match(/\((.*?)\)/)?.[1]
            .split(' to ')[1]
            .slice(0, -2) || '',
      );
      setQuery(searchParams, searchParams.size !== 0);
    }
  }, [category, subcategory, searchParams]);

  return (
    <div className={className}>
      <div>
        <UnstyledButton onClick={() => setOpened((open) => !open)} className={classes.button}>
          {'Category'}
        </UnstyledButton>
        <Collapse in={opened} pl="sm">
          {getParentCategories().map((category) => (
            <DropdownLinks name={category.name} key={category.id} links={getChildrenCategories(category.name)} />
          ))}
        </Collapse>
      </div>
      <div>
        <DropdownItems
          name="Brand"
          items={brands.sort((a, b) => {
            const brandA = a.toUpperCase();
            const brandB = b.toUpperCase();
            if (brandA < brandB) {
              return -1;
            }
            if (brandA > brandB) {
              return 1;
            }
            return 0;
          })}
          selectedItems={selectedBrands}
          setSelectedItems={setSelectedBrands}
        />
      </div>
      <div>
        <DropdownItems
          name="Size"
          items={sizes.sort((a: string, b: string) => {
            if (CLOTHING_SIZES[a] && CLOTHING_SIZES[b]) {
              return CLOTHING_SIZES[a] - CLOTHING_SIZES[b];
            } else if (Number(a) && Number(b)) {
              return Number(a) - Number(b);
            } else return 0;
          })}
          selectedItems={selectedSizes}
          setSelectedItems={setSelectedSizes}
        />
      </div>
      <div>
        <DropdownItems
          name="Color"
          items={colors.sort()}
          selectedItems={selectedColors}
          setSelectedItems={setSelectedColors}
        />
      </div>
      <div>
        <DropdownPrice
          minProductPrice={minProductPrice}
          maxProductPrice={maxProductPrice}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minPriceInput={minPrice}
          setMinPrice={setMinPrice}
          maxPriceInput={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
      <div className={classes.buttons}>
        <Button
          fullWidth
          onClick={() => {
            setFilterQuery();
            toggleScroll();
          }}
        >
          Show
        </Button>
        <Button
          fullWidth
          variant="outline"
          onClick={() => {
            clearFilterProducts();
            toggleScroll();
          }}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default NavbarCatalog;
