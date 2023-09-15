import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  SimpleGrid,
  Paper,
  Button,
  Title,
  Group,
  Text,
  Loader,
  Center,
  rem,
  getStylesRef,
  createStyles,
  Select,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import ModalCarousel from '../../components/modal-carousel/ModalCarousel';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { storeService } from '../../services/StoreService/StoreService';
import { ErrorCodes, getErrorMessage } from '../../utils/helpers/error-handler';
import { notificationError, notificationSuccess } from '../../components/ui/notification';
import useAuth from '../../utils/hooks/useAuth';
import { PiBagSimple } from 'react-icons/pi';
import parse from 'html-react-parser';
import { checkProductInCart } from '../../utils/helpers/cart-helpers';
import { formatPrice } from '../../utils/helpers/format-price';
import './detailed-product-page.scss';

const carouselStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: rem(480),
    margin: 'auto',
    '&:hover': {
      [`& .${getStylesRef('controls')}:not([data-inactive])`]: {
        opacity: 1,
      },
    },
    [theme.fn.smallerThan('xs')]: {
      maxWidth: rem(300),
    },
  },
  control: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
    '&[data-inactive]': {
      opacity: 0,
      cursor: 'default',
    },
  },
  indicator: {
    backgroundColor: '#DEE2E6',
  },
  slide: {
    height: rem(650),
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',

    [theme.fn.smallerThan('xs')]: {
      height: rem(420),
    },
  },
}));

const getSizeData = (variant: ProductVariant) => ({
  label: variant.attributes?.find((attribute) => attribute.name === 'size')?.value.label,
  value: `${variant.id}`,
});
const getProductSizes = (product: ProductProjection) => {
  return [getSizeData(product.masterVariant), ...product.variants.map((variant) => getSizeData(variant))];
};

type DetailedProductPageProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailedProductPage = ({ isLoading, setIsLoading }: DetailedProductPageProps): JSX.Element => {
  const [product, setProduct] = useState<ProductProjection>();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { productID } = useParams();
  const { classes } = carouselStyles();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const { cart, setCart } = useAuth();

  const slides = (product: ProductProjection): JSX.Element[] | null => {
    if (product.masterVariant.images) {
      return product.masterVariant.images.map((image, ind) => (
        <Carousel.Slide
          onClick={() => {
            !opened && setOpened(true);
            setInitialSlide(ind);
          }}
          key={'slide' + ind}
          sx={{ backgroundImage: `url(${image.url})` }}
        ></Carousel.Slide>
      ));
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await storeService.getProduct(productID as string);
        setProduct(data);
      } catch (err) {
        if (err && typeof err === 'object' && 'statusCode' in err && err.statusCode === ErrorCodes.NotFound) {
          navigate('/*', { replace: true });
        } else notificationError(getErrorMessage(err));
      }
    };
    fetchData();
  }, [productID, navigate]);

  useEffect(() => {
    if (product && selectedVariant && cart)
      setButtonDisabled(() => checkProductInCart(product?.id, +selectedVariant, cart));
  }, [selectedVariant, product, cart]);

  return (
    <Container w="100%" h="100%" my="md" px="1rem" size="lg">
      {product ? (
        <>
          <SimpleGrid cols={2} spacing={40} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            <Carousel classNames={classes} withIndicators loop>
              {slides(product)}
            </Carousel>
            <Grid gutter="md">
              <Grid.Col>
                <Paper>
                  <Title order={4}>
                    {product.masterVariant.attributes?.find((attribute) => attribute.name === 'brand')?.value}
                  </Title>
                  <Title order={6} ff="Montserrat">
                    {product.name['en-US']}
                  </Title>
                  <Group spacing="xs">
                    {product.masterVariant.prices?.[0].discounted && (
                      <Text mt="md" fw={700} ff="Montserrat" color="red">
                        {formatPrice(product.masterVariant.prices[0].discounted.value.centAmount / 100)} €
                      </Text>
                    )}
                    <Text
                      mt="md"
                      ff="Montserrat"
                      fw={700}
                      strikethrough={!!product.masterVariant.prices?.[0].discounted}
                    >
                      {product.masterVariant.prices && product.masterVariant.prices[0].value.centAmount / 100 + ' €'}
                    </Text>
                  </Group>
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

                  <Paper fz={13} className="product-description" ff="Montserrat">
                    {product.description?.['en-US'] && parse(product.description['en-US'])}
                  </Paper>
                </Paper>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
          <ModalCarousel
            slides={slides(product)}
            opened={opened}
            setOpened={setOpened}
            initialSlide={initialSlide}
          ></ModalCarousel>
        </>
      ) : (
        <Center h="100%">
          <Loader variant="bars" size="xl" display="block" mx="auto" />
        </Center>
      )}
    </Container>
  );
};

export default DetailedProductPage;
