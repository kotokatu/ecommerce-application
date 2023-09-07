import { Button, UnstyledButton, Collapse, createStyles } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DropdownLinks from '../dropdown/DropdownLinks';
import DropdownPrice from '../dropdown/DropdownPrice';
import DropdownItems from '../dropdown/DropdownItems';
import { CategoryType } from '../../../services/api/CategoryCache';
import { useSearchParams } from 'react-router-dom';
import { storeService } from '../../../services/StoreService/StoreService';
import { notificationError } from '../../ui/notification';

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
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  toggleScroll: () => void;
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
}: NavbarCatalogProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { classes } = navbarCatalogStyles();
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams
      .get('brand')
      ?.split(', ')
      .map((value) => value.slice(1, -1)) || [],
  );
  const [selectedSizes, setSelectedSizes] = useState(
    searchParams
      .get('size')
      ?.split(', ')
      .map((value) => value.slice(1, -1)) || [],
  );
  const [selectedColors, setSelectedColors] = useState(
    searchParams
      .get('color')
      ?.split(', ')
      .map((value) => value.slice(1, -1)) || [],
  );
  const [minPrice, setMinPrice] = useState(
    searchParams
      .get('price')
      ?.match(/\((.*?)\)/)?.[1]
      .split(' to ')[0]
      .slice(0, -2) || '',
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams
      .get('price')
      ?.match(/\((.*?)\)/)?.[1]
      .split(' to ')[1]
      .slice(0, -2) || '',
  );
  const [priceRange, setPriceRange] = useState([minProductPrice, maxProductPrice]);
  const [minMaxPrices, setMinMaxPrices] = useState<number[]>([]);
  const [opened, setOpened] = useState(false);
  const { category, subcategory } = useParams();

  function setFilterQuery() {
    selectedBrands.length
      ? searchParams.set('brand', `"${selectedBrands.join('", "')}"`)
      : searchParams.delete('brand');
    selectedSizes.length ? searchParams.set('size', `"${selectedSizes.join('", "')}"`) : searchParams.delete('size');
    selectedColors.length
      ? searchParams.set('color', `"${selectedColors.join('", "')}"`)
      : searchParams.delete('color');
    if (minPrice || maxPrice)
      searchParams.set('price', `range(${Number(minPrice) * 100} to ${Number(maxPrice) * 100})`);
    setSearchParams(searchParams);
  }

  function clearFilterProducts() {
    searchParams.delete('brand');
    searchParams.delete('size');
    searchParams.delete('color');
    searchParams.delete('price');
    setSearchParams(searchParams);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice('');
    setMaxPrice('');
    setPriceRange([minProductPrice, maxProductPrice]);
  }

  const getParentCategories = () => {
    return categories.filter((category) => !category.parentID);
  };

  const getChildrenCategories = (categoryName: string) => {
    return categories.filter((category) => category.parentName === categoryName).sort((a, b) => +a.order - +b.order);
  };

  useEffect(() => {
    if (searchParams.size === 0) {
      clearFilterProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory]);

  useEffect(() => {
    const getMinMaxPrices = async () => {
      try {
        const res = await storeService.getAllPrices();
        if (res) setMinMaxPrices(res);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };
    getMinMaxPrices();
  }, []);

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
          items={brands}
          selectedItems={selectedBrands}
          setSelectedItems={setSelectedBrands}
        />
      </div>
      <div>
        <DropdownItems name="Size" items={sizes} selectedItems={selectedSizes} setSelectedItems={setSelectedSizes} />
      </div>
      <div>
        <DropdownItems
          name="Color"
          items={colors}
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
          minMaxPrices={minMaxPrices}
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
