import { useRef, useState } from 'react';
import { createStyles, NumberInput, NumberInputHandlers, ActionIcon, rem } from '@mantine/core';
import { storeService } from '../../../services/StoreService/StoreService';
import { notificationError } from '../../ui/notification';
import { LineItem } from '@commercetools/platform-sdk';
import useAuth from '../../../utils/hooks/useAuth';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    padding: `${rem(6)} ${rem(0)}`,
  },

  control: {
    color: theme.black,
    borderRadius: '100%',
    transition: '300ms',

    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },

  input: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    height: rem(28),
    flexGrow: 1,

    '&:disabled': {
      backgroundColor: 'transparent',
      color: theme.black,
      opacity: 1,
    },
  },
}));

interface QuantityInputProps {
  item: LineItem;
  min?: number;
  max?: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function QuantityInput({ item, min = 1, max = 10, isLoading, setIsLoading }: QuantityInputProps) {
  const [quantity, setQuantity] = useState<number | ''>(item.quantity);
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>(null);
  const { setCart } = useAuth();

  return (
    <div className={classes.wrapper}>
      <ActionIcon<'button'>
        size={28}
        variant="transparent"
        onClick={async () => {
          handlers.current?.decrement();
          try {
            setIsLoading(true);
            const updatedCart = await storeService.removeProductFromCart(item.productId, item.variant.id, 1);
            if (updatedCart) setCart(updatedCart);
          } catch (err) {
            if (err instanceof Error) notificationError(err.message);
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={quantity === min || isLoading}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        -
      </ActionIcon>

      <NumberInput
        variant="unstyled"
        min={min}
        max={max}
        handlersRef={handlers}
        value={quantity}
        onChange={(value) => {
          setQuantity(value);
        }}
        classNames={{ input: classes.input }}
        disabled
      />

      <ActionIcon<'button'>
        size={28}
        variant="transparent"
        onClick={async () => {
          handlers.current?.increment();
          try {
            setIsLoading(true);
            const updatedCart = await storeService.addProductToCart(item.productId, item.variant.id);
            if (updatedCart) setCart(updatedCart);
          } catch (err) {
            if (err instanceof Error) notificationError(err.message);
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={quantity === max || isLoading}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        +
      </ActionIcon>
    </div>
  );
}
