import { Button, UnstyledButton, Collapse, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import DropdownLinks from '../dropdown/DropdownLinks';
import DropdownPrice from '../dropdown/DropdownPrice';
import DropdownItems from '../dropdown/DropdownItems';
import { CategoryType } from '../../../services/api/CategoryCache';
import { FilterParams } from '../../../services/StoreService/StoreService';
import { useParams, useSearchParams } from 'react-router-dom';
import { categoryCache } from '../../../pages/catalog/CatalogPage';

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
  setFilters,
  isOpenNavbar,
  setIsOpenNavbar,
}: NavbarCatalogProps) => {
  const { classes } = navbarCatalogStyles();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceRange, setPriceRange] = useState([minProductPrice, maxProductPrice]);
  const [opened, setOpened] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, subcategory } = useParams();

  // useEffect(() => {
  // const brands = searchParams.get('brand');
  // console.log(brands);
  // if (brands) {
  //   const newbrands = brands.split(', ').map((brand) => brand.slice(1, -1));
  //   console.log(newbrands);
  //   setSelectedBrands(newbrands);
  // }
  // }, [searchParams]);

  function getFilterQuery() {
    console.log(selectedBrands);
    if (selectedBrands.length) searchParams.set('brand', `"${selectedBrands.join('", "')}"`);
    if (selectedSizes.length) searchParams.set('size', `"${selectedSizes.join('", "')}"`);
    if (selectedColors.length) searchParams.set('color', `"${selectedColors.join('", "')}"`);
    if (minPrice) searchParams.set('price', `(${Number(minPrice) * 100} to ${Number(maxPrice) * 100})`);
    setSearchParams(searchParams);
    setIsOpenNavbar(!isOpenNavbar);
  }

  function clearFilterProducts() {
    document.querySelectorAll<HTMLInputElement>('input:checked').forEach((item) => (item.checked = false));
    setMinPrice('');
    setMaxPrice('');
    setPriceRange([minProductPrice, maxProductPrice]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    searchParams.delete('brand');
    searchParams.delete('size');
    searchParams.delete('color');
    searchParams.delete('price');
    setFilters([]);
    setSearchParams(searchParams);
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
          min={minProductPrice}
          max={maxProductPrice}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minPriceInput={minPrice}
          setMinPrice={setMinPrice}
          maxPriceInput={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
      <div className={classes.buttons}>
        <Button fullWidth onClick={getFilterQuery}>
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
