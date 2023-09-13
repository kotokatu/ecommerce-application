import { LineItem } from '@commercetools/platform-sdk';
import { storeService } from '../../services/StoreService/StoreService';
import useAuth from '../../utils/hooks/useAuth';
import { notificationError } from '../ui/notification';
import { UnstyledButton, Text, Image, Group, Stack } from '@mantine/core';
import { ImBin } from 'react-icons/im';

type CartItemProps = {
  item: LineItem;
};
const CartItem = ({ item }: CartItemProps) => {
  const { cart, setCart } = useAuth();
  return (
    <Group h={100}>
      {item.variant.images?.[0] && (
        <Image src={item.variant.images[0].url} width={100} height={100} fit="contain"></Image>
      )}
      <Stack spacing={5}>
        <Text ff="Montserrat" fw={700}>
          {item.variant.attributes?.find((attribute) => attribute.name === 'brand')?.value}
        </Text>
        <Text ff="Montserrat">{item.name['en-US']}</Text>
        <Text ff="Montserrat" fz="sm">
          Size: {item.variant.attributes?.find((attribute) => attribute.name === 'size')?.value.label}{' '}
        </Text>
      </Stack>
      <UnstyledButton
        onClick={async () => {
          if (!cart) return;
          try {
            const updatedCart = await storeService.removeProductFromCart(item.productId, item.variant.id);
            if (updatedCart) setCart(updatedCart);
          } catch (err) {
            if (err instanceof Error) notificationError(err.message);
          }
        }}
      >
        <ImBin />
      </UnstyledButton>
    </Group>
  );
};

export default CartItem;
