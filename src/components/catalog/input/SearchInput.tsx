import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { TextInput, UnstyledButton } from '@mantine/core';
import { inputStyles } from './inputStyles';
import { TbX } from 'react-icons/tb';

type SearchInputProps = {
  label: string;
  placeholder: string;
};

const SearchInput = ({ label, placeholder }: SearchInputProps) => {
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { classes } = inputStyles({ floating: searchValue.trim().length !== 0 || focused });

  const setSearchQuery = (query?: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('search', query ?? searchValue);
    navigate('/catalog?' + searchParams.toString());
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
            setSearchQuery('');
          }}
        >
          <TbX />
        </UnstyledButton>
      }
      onChange={(event) => setSearchValue(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.code === 'Enter') {
          setSearchQuery();
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
