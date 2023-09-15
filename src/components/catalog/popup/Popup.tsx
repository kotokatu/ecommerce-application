import { Popover, Button, createStyles } from '@mantine/core';
import { ProductProjection } from '@commercetools/platform-sdk';
import { PiBagSimple } from 'react-icons/pi';
import CartSelector from '../../cart-selector/CartSelector';

const useStyles = createStyles(() => ({
  cartbutton: {
    padding: 10,
    '& *': {
      margin: 0,
    },
  },
}));

type PopupProps = {
  product: ProductProjection;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup = ({ product, isLoading, setIsLoading }: PopupProps) => {
  const { classes } = useStyles();

  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button className={classes.cartbutton} leftIcon={<PiBagSimple size="1.5rem" />}></Button>
      </Popover.Target>
      <Popover.Dropdown>
        <CartSelector product={product} isLoading={isLoading} setIsLoading={setIsLoading} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default Popup;
