import { LineItem } from '@commercetools/platform-sdk';
import { Button } from '@mantine/core';
import { storeService } from '../../services/StoreService/StoreService';
import useAuth from '../../utils/hooks/useAuth';
import { notificationError } from '../ui/notification';

type CartItemProps = {
  item: LineItem;
};
const CartItem = ({ item }: CartItemProps) => {
  const { setCart } = useAuth();
  return (
    <div>
      {item.name['en-US']}
      <Button
        onClick={async () => {
          try {
            const updatedCart = await storeService.removeProductFromCart(item.productId, item.variant.id);
            if (updatedCart) setCart(updatedCart);
          } catch (err) {
            if (err instanceof Error) notificationError(err.message);
          }
        }}
      >
        Remove
      </Button>
    </div>
  );
};

export default CartItem;
