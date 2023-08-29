import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Collapse, UnstyledButton } from '@mantine/core';
import { dropdownStyles } from './dropdownStyles';
import Slider from 'react-slider';
import PriceInput from '../input/PriceInput';

type DropdownPriceProps = {
  min: number;
  max: number;
  minPriceInput: string;
  maxPriceInput: string;
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  setMinPrice: Dispatch<SetStateAction<string>>;
  setMaxPrice: Dispatch<SetStateAction<string>>;
  initiallyOpened?: boolean;
};

const DropdownPrice = ({
  min,
  max,
  priceRange,
  setPriceRange,
  minPriceInput,
  setMinPrice,
  maxPriceInput,
  setMaxPrice,
  initiallyOpened,
}: DropdownPriceProps) => {
  const { classes } = dropdownStyles();
  const [opened, setOpened] = useState(initiallyOpened || false);

  return (
    <>
      <UnstyledButton onClick={() => setOpened((open) => !open)} className={classes.button}>
        <Box>Price</Box>
      </UnstyledButton>
      <Collapse in={opened}>
        <div className={classes.pricedropdown}>
          <div className={classes.sliderbox}>
            <Slider
              className={classes.slider}
              value={priceRange}
              min={min}
              max={max}
              onChange={(value) => {
                setPriceRange(value);
                setMinPrice(`${value[0]}`);
                setMaxPrice(`${value[1]}`);
              }}
            />
          </div>
          <div className={classes.inputbox}>
            <PriceInput
              label="Min"
              placeholder="Min"
              value={minPriceInput}
              setValue={(value) => {
                setMinPrice(value);
                setPriceRange([+value, priceRange[1]]);
              }}
              setValueOnBlur={(value) => {
                if (+value <= min) {
                  setMinPrice(`${min}`);
                  setPriceRange([min, priceRange[1]]);
                }
                if (+value >= priceRange[1]) {
                  setMinPrice(`${priceRange[1]}`);
                  setPriceRange([priceRange[1], priceRange[1]]);
                }
                if (+value === 0) {
                  setMinPrice('');
                  setPriceRange([min, priceRange[1]]);
                }
              }}
            />
            <PriceInput
              label="Max"
              placeholder="Max"
              value={maxPriceInput}
              setValue={(value) => {
                setMaxPrice(value);
                setPriceRange([priceRange[0], +value]);
              }}
              setValueOnBlur={(value) => {
                if (+value <= priceRange[0]) {
                  setMaxPrice(`${priceRange[0]}`);
                  setPriceRange([priceRange[0], priceRange[0]]);
                }
                if (+value >= max || +value === 0) {
                  setMaxPrice('');
                  setPriceRange([priceRange[0], max]);
                }
              }}
            />
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default DropdownPrice;
