import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Collapse, UnstyledButton } from '@mantine/core';
import { dropdownStyles } from './dropdownStyles';
import Slider from 'react-slider';
import PriceInput from '../input/PriceInput';

type DropdownPriceProps = {
  minPriceInput: string;
  maxPriceInput: string;
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  setMinPrice: Dispatch<SetStateAction<string>>;
  setMaxPrice: Dispatch<SetStateAction<string>>;
  minProductPrice: number;
  maxProductPrice: number;
  // minMaxPrices: number[];
};

const DropdownPrice = ({
  priceRange,
  setPriceRange,
  minPriceInput,
  setMinPrice,
  maxPriceInput,
  setMaxPrice,
  minProductPrice,
  maxProductPrice, // minMaxPrices,
}: DropdownPriceProps) => {
  const { classes } = dropdownStyles();
  const [opened, setOpened] = useState(!!minPriceInput || !!maxPriceInput);

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
              value={[+minPriceInput || minProductPrice, +maxPriceInput || maxProductPrice]}
              min={minProductPrice}
              max={maxProductPrice}
              onChange={(value) => {
                setPriceRange([value[0], value[1]]);
                setMinPrice(`${value[0]}`);
                setMaxPrice(`${value[1]}`);
              }}
            />
          </div>
          <div className={classes.inputbox}>
            <PriceInput
              label="Min"
              placeholder="Min"
              price={minPriceInput}
              setPrice={(value) => {
                setMinPrice(value);
                setPriceRange([+value, priceRange[1]]);
              }}
              setPriceOnBlur={(value) => {
                if (+value <= minProductPrice) {
                  setMinPrice(`${minProductPrice}`);
                  setPriceRange([minProductPrice, priceRange[1]]);
                }
                if (+value >= priceRange[1]) {
                  setMinPrice(`${priceRange[1]}`);
                  setPriceRange([priceRange[1], priceRange[1]]);
                }
                if (!maxPriceInput) setMaxPrice(`${maxProductPrice}`);
              }}
            />
            <PriceInput
              label="Max"
              placeholder="Max"
              price={maxPriceInput}
              setPrice={(value) => {
                setMaxPrice(value);
                setPriceRange([priceRange[0], +value]);
              }}
              setPriceOnBlur={(value) => {
                if (+value === 0 || +value >= maxProductPrice) {
                  setMaxPrice(`${maxProductPrice}`);
                  setPriceRange([priceRange[0], maxProductPrice]);
                } else if (+value <= priceRange[0] && +value !== 0) {
                  setMaxPrice(`${priceRange[0]}`);
                  setPriceRange([priceRange[0], priceRange[0]]);
                }
                if (!minPriceInput) setMinPrice(`${minProductPrice}`);
              }}
            />
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default DropdownPrice;
