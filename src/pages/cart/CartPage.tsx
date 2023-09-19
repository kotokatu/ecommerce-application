/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import CartItem from '../../components/cart/CartItem/CartItem';
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
  Modal,
  TextInput,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { PiBagSimple } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { storeService } from '../../services/StoreService/StoreService';
import { notificationError, notificationSuccess } from '../../components/ui/notification';
import { formatPrice } from '../../utils/helpers/format-price';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  link: {
    position: 'relative',
    display: 'inline-block',
    color: theme.black,

    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      left: '50%',
      bottom: -2,
      width: 0,
      height: rem(3),
      borderRadius: rem(2),
      backgroundColor: theme.black,
      transition: 'width 300ms ease 0s, left 300ms ease 0s',
    },

    '&:hover:after': {
      width: '100%',
      left: 0,
    },
  },

  button: {
    transition: '300ms',

    '&:hover': {
      backgroundColor: theme.colors.gray,
      color: theme.white,
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
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {!cart && isLoading ? (
        <Center h="100%">
          <Loader variant="bars" size="xl" display="block" mx="auto" />
        </Center>
      ) : cart?.lineItems.length ? (
        <Container maw="80rem" w="100%">
          <Title order={2} align="center" py={40} ff="Montserrat">
            Your shopping cart
          </Title>
          <Group align="flex-start" position="center" spacing={30}>
            <Stack spacing="lg">
              {cart?.lineItems.map((item) => (
                <CartItem item={item} isLoading={isLoading} setIsLoading={setIsLoading} key={item.id} />
              ))}
            </Stack>
            <Stack sx={{ flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.03)' }} maw={430} spacing="sm" p={15}>
              <Title order={5} ff="Montserrat">
                Order Summary
              </Title>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!cart || !code.trim()) return;
                  try {
                    setCodeLoading(true);
                    setIsLoading(true);
                    const updatedCart = await storeService.addDiscountCode(code.trim().toUpperCase());
                    if (updatedCart) {
                      setCart(updatedCart);
                    }
                  } catch (err) {
                    if (err instanceof Error) notificationError(err.message);
                  } finally {
                    setCode('');
                    setCodeLoading(false);
                    setIsLoading(false);
                  }
                }}
              >
                <Group>
                  <TextInput
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    sx={{ flexGrow: 1 }}
                    placeholder="Enter promocode"
                    ff="Montserrat"
                  ></TextInput>
                  <Button type="submit" w={120} ff="Montserrat" loading={codeLoading} disabled={isLoading}>
                    Apply
                  </Button>
                </Group>
              </form>
              <Group position="apart">
                <Text ff="Montserrat" fw={400}>
                  Subtotal
                </Text>
                <Text ff="Montserrat" fw={400}>
                  {formatPrice(
                    cart.lineItems.reduce((acc, val) => {
                      acc += (val.price.discounted?.value.centAmount || val.price.value.centAmount) * val.quantity;
                      return acc;
                    }, 0) / 100,
                  )}{' '}
                  €
                </Text>
              </Group>
              {!!cart.discountCodes.find((discountCode) => discountCode.state === 'MatchesCart') && (
                <Group position="apart">
                  <Group spacing={5}>
                    <Text ff="Montserrat" fw={400}>
                      Promo
                    </Text>
                    <UnstyledButton
                      onClick={async () => {
                        try {
                          const appliedCode = cart.discountCodes.find(
                            (discountCode) => discountCode.state === 'MatchesCart',
                          )?.discountCode;
                          if (!appliedCode) return;
                          setIsLoading(true);
                          const updatedCart = await storeService.removeDiscountCode(appliedCode);
                          if (updatedCart) {
                            setCart(updatedCart);
                          }
                        } catch (err) {
                          if (err instanceof Error) notificationError(err.message);
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    >
                      <Text
                        lh={1}
                        ff="Montserrat"
                        fw={400}
                        fz={12}
                        c="dimmed"
                        sx={{ borderBottom: `dotted ${rem(1)}` }}
                      >
                        remove
                      </Text>
                    </UnstyledButton>
                  </Group>
                  <Text ff="Montserrat" fw={400}>
                    {'– '}
                    {formatPrice(
                      cart.lineItems.reduce((acc, val) => {
                        acc +=
                          val.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount
                            .centAmount * val.discountedPricePerQuantity[0].quantity;
                        return acc;
                      }, 0) / 100,
                    )}{' '}
                    €
                  </Text>
                </Group>
              )}
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
              <Button
                className={classes.button}
                variant="outline"
                fullWidth
                rightIcon={<RiDeleteBin6Line size="1.2rem" />}
                ff="Montserrat"
                display="block"
                ml="auto"
                onClick={open}
              >
                Clear shopping cart
              </Button>
              <Modal opened={opened} onClose={close} title="Are you sure you want to clear cart?" centered>
                <Text ff="Montserrat" fw={400} mb={20}>
                  This action will remove all items and promocodes from your cart.
                </Text>
                <Group>
                  <Button
                    loading={isLoading}
                    onClick={async () => {
                      if (!cart) return;
                      try {
                        setIsLoading(true);
                        await storeService.deleteCart();
                        notificationSuccess('Shopping cart cleared');
                        setCart(null);
                      } catch (err) {
                        if (err instanceof Error) notificationError(err.message);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                  >
                    Clear cart
                  </Button>
                  <Button className={classes.button} variant="outline" onClick={close}>
                    Cancel
                  </Button>
                </Group>
              </Modal>
            </Stack>
          </Group>
        </Container>
      ) : (
        <Center h="100%">
          <Stack align="center">
            <PiBagSimple size="5rem" />
            <Text c="dimmed">Your shopping cart is empty</Text>
            <Text c="dimmed">
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
