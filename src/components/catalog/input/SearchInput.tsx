import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextInput, UnstyledButton } from '@mantine/core';
import { inputStyles } from './inputStyles';
import { TbX } from 'react-icons/tb';

type SearchInputProps = {
  label: string;
  placeholder: string;
  setQuery: (searchParams: URLSearchParams, hasPrevParams: boolean) => void;
};

const SearchInput = ({ label, placeholder, setQuery }: SearchInputProps) => {
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchParams] = useSearchParams();
  const { classes } = inputStyles({ floating: searchValue.trim().length !== 0 || focused });

  const clearSearchParams = () => {
    searchParams.delete('search');
    setQuery(searchParams, searchParams.size !== 0);
  };

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    setSearchValue(searchQuery || '');
  }, [searchParams]);

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      classNames={classes}
      value={searchValue}
      rightSection={
        <UnstyledButton
          onClick={() => {
            setSearchValue('');
            clearSearchParams();
          }}
        >
          <TbX />
        </UnstyledButton>
      }
      onChange={(event) => setSearchValue(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.code === 'Enter') {
          const hasPrevParams = searchParams.size !== 0;
          searchParams.set('search', searchValue);
          setQuery(searchParams, hasPrevParams);
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
