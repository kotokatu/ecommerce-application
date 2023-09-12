// import { storeService } from '../../services/StoreService/StoreService';
// import { useEffect } from 'react';
// import { notificationError } from '../../components/ui/notification';
// import { getErrorMessage } from '../../utils/helpers/error-handler';
import CartItem from '../../components/basket/CartItem';
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
