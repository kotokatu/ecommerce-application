import CartItem from '../../components/cart/CartItem';
import useAuth from '../../utils/hooks/useAuth';

const CartPage = () => {
  const { cart } = useAuth();

  return (
    <div>
      {cart?.lineItems.length ? (
        <>{cart?.lineItems.map((item) => <CartItem item={item} key={item.id} />)}</>
      ) : (
        'Cart is empty'
      )}
    </div>
  );
};

export default CartPage;
