import { Dispatch, SetStateAction, useState } from 'react';
import { TextInput } from '@mantine/core';
import { inputStyles } from './inputStyles';

type SearchInputProps = {
  label: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  searchProduct: () => void;
};

const SearchInput = ({ label, placeholder, value, setValue, searchProduct }: SearchInputProps) => {
  const [focused, setFocused] = useState(false);
  const { classes } = inputStyles({ floating: value.trim().length !== 0 || focused });

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      classNames={classes}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.code === 'Enter') {
          searchProduct();
        }
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
    />
  );
};

export default SearchInput;
