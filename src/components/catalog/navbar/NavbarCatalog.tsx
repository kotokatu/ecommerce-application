import { Button } from '@mantine/core';
import { useState } from 'react';
import DropdownLinks from '../dropdown/DropdownLinks';
import DropdownPrice from '../dropdown/DropdownPrice';
import DropdownItems from '../dropdown/DropdownItems';

const categoryItems = ['Men', 'Women', 'Accessories'];

type NavbarCatalogProps = {
  className: string;
  brands: string[];
  sizes: string[];
  colors: string[];
  minProductPrice: number;
  maxProductPrice: number;
};

const NavbarCatalog = ({ className, brands, sizes, colors, minProductPrice, maxProductPrice }: NavbarCatalogProps) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [valueSlider, setValueSlider] = useState([minProductPrice, maxProductPrice]);

  function getFilterProducts() {
    console.log(
      'min',
      valueSlider[0],
      'max',
      valueSlider[1],
      'brands',
      selectedBrands,
      'sizes',
      selectedSizes,
      'colors',
      selectedColors,
    );
  }

  function clearFilterProducts() {
    document.querySelectorAll<HTMLInputElement>('input:checked').forEach((item) => (item.checked = false));
    setMinPrice('');
    setMaxPrice('');
    setValueSlider([minProductPrice, maxProductPrice]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  }

  return (
    <div className={className}>
      <div>
        <DropdownLinks name="Category" links={categoryItems} />
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
          valueSlider={valueSlider}
          setValueSlider={setValueSlider}
          minPriceInput={minPrice}
          setMinPrice={setMinPrice}
          maxPriceInput={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
      <div>
        <Button fullWidth onClick={getFilterProducts}>
          Show
        </Button>
        <Button fullWidth type="submit" variant="outline" onClick={clearFilterProducts}>
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default NavbarCatalog;
