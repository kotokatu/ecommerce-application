import { Popover, Button, Select, Group } from '@mantine/core';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { PiBagSimple } from 'react-icons/pi';
import { storeService } from '../../../services/StoreService/StoreService';
import { notificationError, notificationSuccess } from '../../ui/notification';
import useAuth from '../../../utils/hooks/useAuth';
import { checkProductInCart } from '../../../utils/helpers/cart-helpers';

const getSizeData = (variant: ProductVariant) => ({
  label: variant.attributes?.find((attribute) => attribute.name === 'size')?.value.label,
  value: `${variant.id}`,
});

const getProductSizes = (product: ProductProjection) => {
  return [getSizeData(product.masterVariant), ...product.variants.map((variant) => getSizeData(variant))];
};

type PopupProps = {
  product: ProductProjection;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup = ({ product, isLoading, setIsLoading }: PopupProps) => {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { cart, setCart } = useAuth();

  useEffect(() => {
    if (product && selectedVariant && cart)
      setButtonDisabled(() => checkProductInCart(product?.id, +selectedVariant, cart));
  }, [selectedVariant, product, cart]);

  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button rightIcon={<PiBagSimple size="1.5rem" />}>Add to</Button>
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}
      >
        <Select
          my="md"
          mr="md"
          withinPortal
          data={getProductSizes(product)}
          onChange={setSelectedVariant}
          placeholder="Select size"
        />
        <Group spacing={5}>
          <Button
            loading={isLoading && !buttonDisabled}
            rightIcon={<PiBagSimple size="1.5rem" />}
            mr="sm"
            onClick={async () => {
              if (!selectedVariant) return;
              setIsLoading(true);
              try {
                const updatedCart = await storeService.addProductToCart(product.id, +selectedVariant);
                if (updatedCart) {
                  notificationSuccess('Item added to cart');
                  setCart(updatedCart);
                  setButtonDisabled(true);
                }
              } catch (err) {
                if (err instanceof Error) notificationError(err.message);
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={buttonDisabled}
          >
            Add To
          </Button>
          {buttonDisabled && (
            <Button
              loading={isLoading}
              rightIcon={<PiBagSimple size="1.5rem" />}
              onClick={async () => {
                if (cart && selectedVariant) {
                  setIsLoading(true);
                  try {
                    let updatedCart = await storeService.removeProductFromCart(product.id, +selectedVariant);
                    if (updatedCart?.lineItems.length === 0) {
                      await storeService.deleteCart();
                      updatedCart = null;
                    }
                    notificationSuccess('Item removed from cart');
                    setCart(updatedCart);
                    setButtonDisabled(false);
                  } catch (err) {
                    if (err instanceof Error) notificationError(err.message);
                  } finally {
                    setIsLoading(false);
                  }
                }
              }}
            >
              Remove From
            </Button>
          )}
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Popup;
