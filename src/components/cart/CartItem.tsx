import useAuth from '../../utils/hooks/useAuth';
import { LineItem } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { UnstyledButton, Text, Image, Group, Stack, Divider, createStyles } from '@mantine/core';
import { storeService } from '../../services/StoreService/StoreService';
import { notificationError } from '../ui/notification';
import { TbX } from 'react-icons/tb';
import { QuantityInput } from './QuantityInput/QuantityInput';
import CustomTooltip from '../ui/CustomTooltip';

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
        <Link to={`/catalog/product/${item.productId}`}>
          {item.variant.images?.[0] && (
            <Image src={item.variant.images[0].url} width={100} height={100} fit="contain"></Image>
          )}
        </Link>
        <Stack spacing={2}>
          <Group spacing="xs">
            <Text
              ff="Montserrat"
              fw={700}
              fz="sm"
              strikethrough={!!item.price.discounted || !!item.discountedPricePerQuantity.length}
            >
              {item.price.value.centAmount / 100} €
            </Text>

            {item.price.discounted && (
              <Text ff="Montserrat" fw={700} fz="sm" c="red" strikethrough={!!item.discountedPricePerQuantity.length}>
                {item.price.discounted.value.centAmount / 100} €
              </Text>
            )}
            {item.discountedPricePerQuantity.length && (
              <Text ff="Montserrat" fw={700} fz="sm" c="red">
                {item.discountedPricePerQuantity[0].discountedPrice.value.centAmount / 100} €
              </Text>
            )}
          </Group>
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
          <CustomTooltip label="Delete item">
            <UnstyledButton
              className={classes.button}
              disabled={isLoading}
              mr={3}
              onClick={async () => {
                if (!cart) return;
                try {
                  setIsLoading(true);
                  let updatedCart = await storeService.removeProductFromCart(item.productId, item.variant.id);
                  if (updatedCart?.lineItems.length === 0) {
                    await storeService.deleteCart();
                    updatedCart = null;
                  }
                  setCart(updatedCart);
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
          </CustomTooltip>
        </Group>
      </Group>
      <Divider />
    </>
  );
};

export default CartItem;
