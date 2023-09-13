import CartItem from '../../components/cart/CartItem';
import useAuth from '../../utils/hooks/useAuth';
import { Text, Center, Title, Stack, createStyles, Loader } from '@mantine/core';
import { PiBagSimple } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'inline-block',
    borderBottom: `solid 2px transparent`,
    transition: '.3s',

    '&:hover': {
      borderBottom: `solid 2px ${theme.black}`,
    },
  },
}));

type CartPageProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartPage = ({ isLoading, setIsLoading }: CartPageProps) => {
  const { cart } = useAuth();
  const { classes } = useStyles();

  return (
    <>
      {!cart && isLoading ? (
        <Center h="100%">
          <Loader variant="bars" size="xl" display="block" mx="auto" />
        </Center>
      ) : cart?.lineItems.length ? (
        <div>
          <Title order={2} align="center" py={20} ff="Montserrat">
            Your shopping bag
          </Title>
          {cart?.lineItems.map((item) => (
            <CartItem item={item} isLoading={isLoading} setIsLoading={setIsLoading} key={item.id} />
          ))}
          <Text>{cart?.totalPrice.centAmount / 100} €</Text>
        </div>
      ) : (
        <Center h="100%">
          <Stack align="center">
            <PiBagSimple size="5rem" />
            <Text>Your shopping bag is empty</Text>
            <Text>
              Browse our{' '}
              <Link className={classes.link} to="/catalog">
                catalog
              </Link>
            </Text>
          </Stack>
        </Center>
      )}
    </>
  );
};

export default CartPage;
