import { Dispatch, SetStateAction, useState } from 'react';
import { TextInput } from '@mantine/core';
import { inputStyles } from './inputStyles';

type PriceInputProps = {
  label: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setValueOnBlur: Dispatch<SetStateAction<string>>;
};

const PriceInput = ({ label, placeholder, value, setValue, setValueOnBlur }: PriceInputProps) => {
  const [focused, setFocused] = useState(false);
  const { classes } = inputStyles({ floating: value.trim().length !== 0 || focused });

  return (
    <TextInput
      type="number"
      label={label}
      placeholder={placeholder}
      classNames={classes}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        setFocused(false);
        setValueOnBlur(event.currentTarget.value);
      }}
      mt="md"
      autoComplete="nope"
    />
  );
};

export default PriceInput;
