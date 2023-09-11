import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { inputStyles } from './inputStyles';

type PriceInputProps = {
  label: string;
  placeholder: string;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  setPriceOnBlur: Dispatch<SetStateAction<string>>;
};

const PriceInput = ({ label, placeholder, price, setPrice, setPriceOnBlur }: PriceInputProps) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const { classes } = inputStyles({ floating: value.trim().length !== 0 || focused });

  useEffect(() => {
    setValue(price || '');
  }, [price]);

  return (
    <TextInput
      type="number"
      label={label}
      placeholder={placeholder}
      classNames={classes}
      value={value}
      onChange={(event) => setPrice(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        setFocused(false);
        setPriceOnBlur(event.currentTarget.value);
      }}
      mt="md"
      autoComplete="nope"
    />
  );
};

export default PriceInput;
