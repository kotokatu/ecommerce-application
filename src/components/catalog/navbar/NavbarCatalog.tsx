import { Button, UnstyledButton, Collapse, createStyles } from '@mantine/core';
import { useState } from 'react';
import DropdownLinks from '../dropdown/DropdownLinks';
import DropdownPrice from '../dropdown/DropdownPrice';
import DropdownItems from '../dropdown/DropdownItems';
import { CategoryType } from '../../../services/api/CategoryCache';
import { useSearchParams } from 'react-router-dom';

const navbarCatalogStyles = createStyles((theme) => ({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0 1rem 0 0',
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
  isOpenNavbar: boolean;
  setIsOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarCatalog = ({
  className,
  categories,
  brands,
  sizes,
  colors,
  minProductPrice,
  maxProductPrice,
  isOpenNavbar,
  setIsOpenNavbar,
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
  const [opened, setOpened] = useState(false);

  function setFilterQuery() {
    selectedBrands.length
      ? searchParams.set('brand', `"${selectedBrands.join('", "')}"`)
      : searchParams.delete('brand');
    selectedSizes.length ? searchParams.set('size', `"${selectedSizes.join('", "')}"`) : searchParams.delete('size');
    selectedColors.length
      ? searchParams.set('color', `"${selectedColors.join('", "')}"`)
      : searchParams.delete('color');
    if (minPrice) searchParams.set('price', `range(${Number(minPrice) * 100} to ${Number(maxPrice) * 100})`);
    setSearchParams(searchParams);
    setIsOpenNavbar(!isOpenNavbar);
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

    setIsOpenNavbar(!isOpenNavbar);
  }

  const getParentCategories = () => {
    return categories.filter((category) => !category.parentID);
  };

  const getChildrenCategories = (categoryName: string) => {
    return categories.filter((category) => category.parentName === categoryName).sort((a, b) => +a.order - +b.order);
  };

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
        />
      </div>
      <div className={classes.buttons}>
        <Button fullWidth onClick={setFilterQuery}>
          Show
        </Button>
        <Button fullWidth variant="outline" onClick={clearFilterProducts}>
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default NavbarCatalog;
