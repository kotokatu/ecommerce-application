import { Button, UnstyledButton, Collapse, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import DropdownLinks from '../dropdown/DropdownLinks';
import DropdownPrice from '../dropdown/DropdownPrice';
import DropdownItems from '../dropdown/DropdownItems';
import { CategoryType } from '../../../services/api/CategoryCache';
import { FilterParams } from '../../../services/StoreService/StoreService';
import { useParams } from 'react-router-dom';
import { categoryCache } from '../../../services/api/CategoryCache';

const navbarCatalogStyles = createStyles((theme) => ({
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
  const [opened, setOpened] = useState(false);
  const { category, subcategory } = useParams();

  useEffect(() => {
    clearFilterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory]);

  function getFilterProducts() {
    setFilters([
      category
        ? `${FilterParams.category}: "${
            subcategory ? categoryCache.getCategoryID(subcategory, category) : categoryCache.getCategoryID(category)
          }"`
        : '',
      selectedBrands.length ? `${FilterParams.brand}: "${selectedBrands.join('", "')}"` : '',
      selectedSizes.length ? `${FilterParams.size}: "${selectedSizes.join('", "')}"` : '',
      selectedColors.length ? `${FilterParams.color}: "${selectedColors.join('", "')}"` : '',
      minPrice ? `${FilterParams.price}: range(${Number(minPrice) * 100} to ${Number(maxPrice) * 100})` : '',
    ]);
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
  }

  const getParentCategories = () => {
    return categories.filter((category) => !category.parentID);
  };

  const getChildrenCategories = (categoryName: string) => {
    return categories.filter((category) => category.parentName === categoryName);
  };

  return (
    <div className={classes.navbar}>
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
