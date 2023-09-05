import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Collapse, UnstyledButton } from '@mantine/core';
import { dropdownStyles } from './dropdownStyles';
import Slider from 'react-slider';
import PriceInput from '../input/PriceInput';
import { storeService } from '../../../services/StoreService/StoreService';
import { notificationError } from '../../ui/notification';

type DropdownPriceProps = {
  minPriceInput: string;
  maxPriceInput: string;
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  setMinPrice: Dispatch<SetStateAction<string>>;
  setMaxPrice: Dispatch<SetStateAction<string>>;
  minProductPrice: number;
  maxProductPrice: number;
};

const DropdownPrice = ({
  priceRange,
  setPriceRange,
  minPriceInput,
  setMinPrice,
  maxPriceInput,
  setMaxPrice,
  minProductPrice,
  maxProductPrice,
}: DropdownPriceProps) => {
  const { classes } = dropdownStyles();
  const [minMaxPrices, setMinMaxPrices] = useState<number[]>([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const getMinMaxPrices = async () => {
      try {
        const res = await storeService.getAllPrices();
        if (res) setMinMaxPrices(res);
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };
    getMinMaxPrices();
  }, []);

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
              min={minMaxPrices[0]}
              max={minMaxPrices[1]}
              onChange={(value) => {
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
                if (+value === 0) {
                  setMinPrice('');
                  setPriceRange([minProductPrice, priceRange[1]]);
                }
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
                if (+value <= priceRange[0]) {
                  setMaxPrice(`${priceRange[0]}`);
                  setPriceRange([priceRange[0], priceRange[0]]);
                }
                if (+value >= maxProductPrice || +value === 0) {
                  setMaxPrice('');
                  setPriceRange([priceRange[0], maxProductPrice]);
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
