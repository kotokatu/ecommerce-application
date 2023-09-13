import { LineItem } from '@commercetools/platform-sdk';
import { storeService } from '../../services/StoreService/StoreService';
import useAuth from '../../utils/hooks/useAuth';
import { notificationError } from '../ui/notification';
import { UnstyledButton, Text, Image, Group, Stack, Divider, createStyles } from '@mantine/core';
import { TbX } from 'react-icons/tb';
import { QuantityInput } from './QuantityInput/QuantityInput';

const useStyles = createStyles(() => ({
  button: {
    '&:disabled': {
      opacity: 0.5,
    },
  },
}));

type CartItemProps = {
  item: LineItem;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const CartItem = ({ item, isLoading, setIsLoading }: CartItemProps) => {
  const { cart, setCart } = useAuth();
  const { classes } = useStyles();

  return (
    <>
      <Group h={100} miw={320} my={7} noWrap>
        {item.variant.images?.[0] && (
          <Image src={item.variant.images[0].url} width={100} height={100} fit="contain"></Image>
        )}
        <Stack spacing={2}>
          <Text ff="Montserrat" fw={700} fz="sm">
            {item.price.value.centAmount / 100} €
          </Text>
          <Text ff="Montserrat" fw={700}>
            {item.variant.attributes?.find((attribute) => attribute.name === 'brand')?.value}
          </Text>
          <Text ff="Montserrat">{item.name['en-US']}</Text>
          <Text ff="Montserrat" fz="sm">
            Size: {item.variant.attributes?.find((attribute) => attribute.name === 'size')?.value.label}{' '}
          </Text>
        </Stack>
        <Group ml="auto" noWrap>
          <QuantityInput item={item} isLoading={isLoading} setIsLoading={setIsLoading} />
          <UnstyledButton
            className={classes.button}
            disabled={isLoading}
            onClick={async () => {
              if (!cart) return;
              try {
                setIsLoading(true);
                const updatedCart = await storeService.removeProductFromCart(item.productId, item.variant.id);
                if (updatedCart) setCart(updatedCart);
              } catch (err) {
                if (err instanceof Error) notificationError(err.message);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            <Group>
              <TbX />
            </Group>
          </UnstyledButton>
        </Group>
      </Group>
      <Divider />
    </>
  );
};

export default CartItem;
