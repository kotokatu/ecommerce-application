import { useState } from 'react';
import SearchInput from '../input/SearchInput';
import SortPicker from '../sort-picker/SortPicker';

const HeaderCatalog = ({ className }: { className: string }) => {
  const [searchValue, setSearchValue] = useState('');

  function searchProduct() {
    console.log(searchValue);
  }

  return (
    <div className={className}>
      <SortPicker />
      <SearchInput
        label="Search product"
        placeholder="Enter a name"
        value={searchValue}
        setValue={setSearchValue}
        searchProduct={searchProduct}
      />
    </div>
  );
};

export default HeaderCatalog;
