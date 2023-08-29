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
  valueSlider: number[];
  setValueSlider: Dispatch<SetStateAction<number[]>>;
  setMinPrice: Dispatch<SetStateAction<string>>;
  setMaxPrice: Dispatch<SetStateAction<string>>;
  initiallyOpened?: boolean;
};

const DropdownPrice = ({
  min,
  max,
  valueSlider,
  setValueSlider,
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
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.button}>
        <Box>Price</Box>
      </UnstyledButton>
      <Collapse in={opened}>
        <div className={classes.pricedropdown}>
          <div className={classes.sliderbox}>
            <Slider
              className={classes.slider}
              value={valueSlider}
              min={min}
              max={max}
              onChange={(event) => {
                setValueSlider(event);
                setMinPrice(`${event[0]}`);
                setMaxPrice(`${event[1]}`);
              }}
            />
          </div>
          <div className={classes.inputbox}>
            <PriceInput
              label="Min"
              placeholder="Min"
              value={minPriceInput}
              setValue={(event) => {
                setMinPrice(event);
                setValueSlider([+event, valueSlider[1]]);
              }}
              setValueOnBlur={(event) => {
                if (+event <= min) {
                  setMinPrice(`${min}`);
                  setValueSlider([min, valueSlider[1]]);
                }
                if (+event >= valueSlider[1]) {
                  setMinPrice(`${valueSlider[1]}`);
                  setValueSlider([valueSlider[1], valueSlider[1]]);
                }
                if (+event === 0) {
                  setMinPrice('');
                  setValueSlider([min, valueSlider[1]]);
                }
              }}
            />
            <PriceInput
              label="Max"
              placeholder="Max"
              value={maxPriceInput}
              setValue={(event) => {
                setMaxPrice(event);
                setValueSlider([valueSlider[0], +event]);
              }}
              setValueOnBlur={(event) => {
                if (+event >= max || +event === 0) {
                  setMaxPrice('');
                  setValueSlider([valueSlider[0], max]);
                }
                if (+event <= valueSlider[0]) {
                  setMaxPrice(`${valueSlider[0]}`);
                  setValueSlider([valueSlider[0], valueSlider[0]]);
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
