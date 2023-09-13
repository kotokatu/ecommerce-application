import CartItem from '../../components/cart/CartItem';
import useAuth from '../../utils/hooks/useAuth';
import { Text } from '@mantine/core';

const CartPage = () => {
  const { cart } = useAuth();

  return (
    <div>
      {cart?.lineItems.length ? (
        <>
          {cart?.lineItems.map((item) => <CartItem item={item} key={item.id} />)}
          <Text>{cart?.totalPrice.centAmount / 100} EUR</Text>
        </>
      ) : (
        'Cart is empty'
      )}
    </div>
  );
};

export default CartPage;
