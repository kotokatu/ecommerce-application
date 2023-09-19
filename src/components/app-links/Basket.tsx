import { NavLink } from 'react-router-dom';
import useAuth from '../../utils/hooks/useAuth';
import { PiBagSimple } from 'react-icons/pi';
import { linksStyle } from './links-style';

const Basket = () => {
  const { cart } = useAuth();
  const { classes } = linksStyle();

  function setActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? `${classes.basket} ${classes.basketActive}` : classes.basket;
  }

  return (
    <NavLink to={'/basket'} className={setActiveLink}>
      <div className={classes.icon}>
        <PiBagSimple size="1.5rem" />
        {cart?.totalLineItemQuantity ? (
          <span className={classes.productcount}>{cart?.totalLineItemQuantity}</span>
        ) : null}
      </div>
    </NavLink>
  );
};

export default Basket;
