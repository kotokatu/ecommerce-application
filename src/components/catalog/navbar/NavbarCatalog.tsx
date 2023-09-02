import { Button, createStyles } from '@mantine/core';
import { useEffect, useState, useCallback } from 'react';
import DropdownLinks from '../dropdown/DropdownLinks';
import DropdownPrice from '../dropdown/DropdownPrice';
import DropdownItems from '../dropdown/DropdownItems';
import { CategoryType } from '../../../services/api/CategoryCache';
import { FilterParams } from '../../../services/ProductService/ProductService';
import { useParams } from 'react-router-dom';

const navbarCatalogStyles = createStyles(() => ({
  navbar: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginRight: '10px',
    borderRight: '0.0625rem solid #e9ecef',
    width: '260px',
    minWidth: '260px',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0 10px',
  },
}));

type NavbarCatalogProps = {
  categories: CategoryType[];
  brands: string[];
  sizes: string[];
  colors: string[];
  minProductPrice: number;
  maxProductPrice: number;
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

const NavbarCatalog = ({
  categories,
  brands,
  sizes,
  colors,
  minProductPrice,
  maxProductPrice,
  setFilters,
}: NavbarCatalogProps) => {
  const { classes } = navbarCatalogStyles();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceRange, setPriceRange] = useState([minProductPrice, maxProductPrice]);
  const { category, subcategory } = useParams();

  function getFilterProducts() {
    setFilters([
      category ? `${FilterParams.category}: "${subcategory || category}"` : '',
      selectedBrands.length ? `${FilterParams.brand}: "${selectedBrands.join('", "')}"` : '',
      selectedSizes.length ? `${FilterParams.size}: "${selectedSizes.join('", "')}"` : '',
      selectedColors.length ? `${FilterParams.color}: "${selectedColors.join('", "')}"` : '',
      minPrice ? `${FilterParams.price}: range(${Number(minPrice) * 100} to ${Number(maxPrice) * 100})` : '',
    ]);
  }

  const clearFilterProducts = useCallback(() => {
    document.querySelectorAll<HTMLInputElement>('input:checked').forEach((item) => (item.checked = false));
    setMinPrice('');
    setMaxPrice('');
    setPriceRange([minProductPrice, maxProductPrice]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setFilters([]);
  }, [
    setMinPrice,
    setMaxPrice,
    setPriceRange,
    setSelectedBrands,
    setSelectedSizes,
    setSelectedColors,
    setFilters,
    minProductPrice,
    maxProductPrice,
  ]);

  useEffect(() => {
    clearFilterProducts();
  }, [clearFilterProducts]);

  return (
    <div className={classes.navbar}>
      <div>
        <DropdownLinks name="Category" links={categories} />
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
        <Button fullWidth onClick={getFilterProducts}>
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
