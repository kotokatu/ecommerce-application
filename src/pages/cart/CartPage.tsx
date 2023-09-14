import { useState } from 'react';
import CartItem from '../../components/cart/CartItem';
import useAuth from '../../utils/hooks/useAuth';
import {
  Text,
  Center,
  Title,
  Stack,
  createStyles,
  Loader,
  Group,
  Container,
  Button,
  TextInput,
  rem,
} from '@mantine/core';
import { PiBagSimple } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { storeService } from '../../services/StoreService/StoreService';
import { notificationError } from '../../components/ui/notification';
import { formatPrice } from '../../utils/helpers/format-price';

const useStyles = createStyles((theme) => ({
  cartSummary: {
    flexGrow: 1,
  },
  link: {
    display: 'inline-block',
    borderBottom: `solid ${rem(2)} transparent`,
    transition: '300ms',

    '&:hover': {
      borderBottom: `solid ${rem(2)} ${theme.black}`,
    },
  },
}));

type CartPageProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartPage = ({ isLoading, setIsLoading }: CartPageProps) => {
  const { cart, setCart } = useAuth();
  const { classes } = useStyles();
  const [code, setCode] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);

  return (
    <>
      {!cart && isLoading ? (
        <Center h="100%">
          <Loader variant="bars" size="xl" display="block" mx="auto" />
        </Center>
      ) : cart?.lineItems.length ? (
        <Container w="100%">
          <Title order={2} align="center" py={40} ff="Montserrat">
            Your shopping bag
          </Title>
          <Group align="flex-start" spacing={30}>
            <div>
              <div>
                <Button
                  disabled={isLoading}
                  rightIcon={<RiDeleteBin6Line size="1.2rem" />}
                  ff="Montserrat"
                  fz={13}
                  py={3}
                  display="block"
                  ml="auto"
                  variant="outline"
                  styles={{
                    root: {
                      height: 'unset',
                      transition: '300ms',
                    },
                  }}
                  onClick={async () => {
                    if (!cart) return;
                    try {
                      setIsLoading(true);
                      await storeService.deleteCart();
                      setCart(null);
                    } catch (err) {
                      if (err instanceof Error) notificationError(err.message);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  Delete all items
                </Button>
              </div>
              {cart?.lineItems.map((item) => (
                <CartItem item={item} isLoading={isLoading} setIsLoading={setIsLoading} key={item.id} />
              ))}
            </div>
            <Stack className={classes.cartSummary} maw={415}>
              <Title order={5} ff="Montserrat" pb={15}>
                Summary
              </Title>
              <Group>
                <TextInput
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  sx={{ flexGrow: 1 }}
                  placeholder="Enter promocode"
                  ff="Montserrat"
                ></TextInput>
                <Button
                  ff="Montserrat"
                  loading={codeLoading}
                  disabled={isLoading}
                  onClick={async () => {
                    if (!cart || !code) return;
                    try {
                      setCodeLoading(true);
                      setIsLoading(true);
                      const updatedCart = await storeService.getCartWithDiscount(code);
                      if (updatedCart) setCart(updatedCart);
                    } catch (err) {
                      if (err instanceof Error) notificationError(err.message);
                    } finally {
                      setCode('');
                      setCodeLoading(false);
                      setIsLoading(false);
                    }
                  }}
                >
                  Apply
                </Button>
              </Group>
              <Group position="apart">
                <Text ff="Montserrat" fw={700}>
                  Total
                </Text>
                <Text ff="Montserrat" fw={700}>
                  {formatPrice(cart.totalPrice.centAmount / 100)} €
                </Text>
              </Group>
              <Button mt="auto" ff="Montserrat">
                Checkout
              </Button>
            </Stack>
          </Group>
        </Container>
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
