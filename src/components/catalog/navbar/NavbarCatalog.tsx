import { Button, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import DropdownLinks from '../dropdown/DropdownLinks';
import DropdownPrice from '../dropdown/DropdownPrice';
import DropdownItems from '../dropdown/DropdownItems';
import { CategoryType } from '../../../services/api/CategoryCache';
import { FilterParams } from '../../../services/StoreService/StoreService';
import { useParams } from 'react-router-dom';

const navbarCatalogStyles = createStyles(() => ({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0 1rem 0 0',
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
  const { category, subcategory } = useParams();

  useEffect(() => {
    clearFilterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory]);

  function getFilterProducts() {
    setFilters([
      category ? `${FilterParams.category}: "${subcategory || category}"` : '',
      selectedBrands.length ? `${FilterParams.brand}: "${selectedBrands.join('", "')}"` : '',
      selectedSizes.length ? `${FilterParams.size}: "${selectedSizes.join('", "')}"` : '',
      selectedColors.length ? `${FilterParams.color}: "${selectedColors.join('", "')}"` : '',
      minPrice ? `${FilterParams.price}: range(${Number(minPrice) * 100} to ${Number(maxPrice) * 100})` : '',
    ]);
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
    setFilters([]);
    setIsOpenNavbar(!isOpenNavbar);
  }

  return (
    <div className={className}>
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
