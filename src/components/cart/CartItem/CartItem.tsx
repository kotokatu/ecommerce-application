import useAuth from '../../../utils/hooks/useAuth';
import { LineItem } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { Text, Image, Group, Stack, Divider, Anchor, createStyles, ActionIcon, rem } from '@mantine/core';
import { storeService } from '../../../services/StoreService/StoreService';
import { notificationError } from '../../ui/notification';
import { TbX } from 'react-icons/tb';
import { QuantityInput } from '../QuantityInput/QuantityInput';
import CustomTooltip from '../../ui/CustomTooltip';
import { formatPrice } from '../../../utils/helpers/format-price';

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.black,
    borderRadius: '100%',
    transition: '300ms',

    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },

  text: {
    fontFamily: `Montserrat, ${theme.fontFamily}, ${theme.fontFamilyMonospace}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: theme.fontSizes.xs,
    },

    [`@media (max-width: ${rem(550)})`]: {
      fontSize: rem(11),
    },
  },

  itemName: {
    fontFamily: `Montserrat, ${theme.fontFamily}, ${theme.fontFamilyMonospace}`,
    minWidth: rem(300),

    [`@media (max-width: ${rem(700)})`]: {
      fontSize: theme.fontSizes.xs,
      minWidth: rem(230),
    },

    [`@media (max-width: ${rem(550)})`]: {
      fontSize: rem(11),
      minWidth: 'unset',
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
      <Group miw={320} align="flex-start" noWrap>
        <Anchor component={Link} to={`/catalog/product/${item.productId}`} sx={{ alignSelf: 'center', flexGrow: 0 }}>
          {item.variant.images?.[0] && (
            <Image src={item.variant.images[0].url} width={80} height={100} fit="contain"></Image>
          )}
        </Anchor>
        <Stack p={8} sx={{ flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
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
              <CustomTooltip label={`Total price for ${item.quantity} item(s)`}>
                <Text
                  className={classes.text}
                  ml="auto"
                  fw={700}
                  fz="sm"
                  underline
                  sx={{ textDecorationStyle: 'dotted', textUnderlineOffset: `${rem(3)}`, cursor: 'default' }}
                >
                  {formatPrice(item.totalPrice.centAmount / 100)} €
                </Text>
              </CustomTooltip>
            </Group>
            <Group noWrap>
              <Stack spacing={4}>
                <Text className={classes.text} fw={700} fz="sm">
                  {item.variant.attributes?.find((attribute) => attribute.name === 'brand')?.value}
                </Text>
                <Anchor underline={false} component={Link} to={`/catalog/product/${item.productId}`}>
                  <Text maw={305} className={classes.itemName}>
                    {item.name['en-US']}
                  </Text>
                </Anchor>
                <Text className={classes.text} fz="sm">
                  Size: {item.variant.attributes?.find((attribute) => attribute.name === 'size')?.value.label}{' '}
                </Text>
              </Stack>
              <Stack ml="auto">
                <Group noWrap>
                  <QuantityInput item={item} isLoading={isLoading} setIsLoading={setIsLoading} />
                  <CustomTooltip label="Remove from cart">
                    <ActionIcon
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
                    </ActionIcon>
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
