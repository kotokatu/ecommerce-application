import useAuth from '../../utils/hooks/useAuth';
import { LineItem } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { UnstyledButton, Text, Image, Group, Stack, Divider, Anchor, createStyles } from '@mantine/core';
import { storeService } from '../../services/StoreService/StoreService';
import { notificationError } from '../ui/notification';
import { TbX } from 'react-icons/tb';
import { QuantityInput } from './QuantityInput/QuantityInput';
import CustomTooltip from '../ui/CustomTooltip';
import { formatPrice } from '../../utils/helpers/format-price';

const useStyles = createStyles((theme) => ({
  button: {
    '&:disabled': {
      opacity: 0.5,
    },
  },
  text: {
    fontFamily: `Montserrat, ${theme.fontFamily}, ${theme.fontFamilyMonospace}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: theme.fontSizes.xs,
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
      <Group miw={320} my={7} align="flex-start" noWrap>
        <Anchor component={Link} to={`/catalog/product/${item.productId}`} sx={{ alignSelf: 'center' }}>
          {item.variant.images?.[0] && (
            <Image src={item.variant.images[0].url} width={80} height={80} fit="contain"></Image>
          )}
        </Anchor>
        <Stack sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            <Group spacing="xs">
              <Text
                className={classes.text}
                fw={700}
                fz="sm"
                strikethrough={!!item.price.discounted || !!item.discountedPricePerQuantity.length}
              >
                {formatPrice(item.price.value.centAmount / 100)} €
              </Text>
              {item.price.discounted && (
                <Text
                  className={classes.text}
                  fw={700}
                  fz="sm"
                  c="red"
                  strikethrough={!!item.discountedPricePerQuantity.length}
                >
                  {formatPrice(item.price.discounted.value.centAmount / 100)} €
                </Text>
              )}
              {item.discountedPricePerQuantity.length && (
                <Text className={classes.text} fw={700} fz="sm" c="red">
                  {formatPrice(item.discountedPricePerQuantity[0].discountedPrice.value.centAmount / 100)} €
                </Text>
              )}
              <Text className={classes.text} ml="auto" fw={700} fz="sm">
                {formatPrice(item.totalPrice.centAmount / 100)} €
              </Text>
            </Group>
            <Group noWrap>
              <Stack spacing={4}>
                <Text className={classes.text} fw={700} fz="sm">
                  {item.variant.attributes?.find((attribute) => attribute.name === 'brand')?.value}
                </Text>
                <Text className={classes.text}>{item.name['en-US']}</Text>
                <Text className={classes.text} fz="sm">
                  Size: {item.variant.attributes?.find((attribute) => attribute.name === 'size')?.value.label}{' '}
                </Text>
              </Stack>
              <Stack ml="auto">
                <Group noWrap>
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
              </Stack>
            </Group>
          </Stack>
        </Stack>
      </Group>
      <Divider />
    </>
  );
};

export default CartItem;
