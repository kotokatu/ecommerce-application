import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  SimpleGrid,
  Paper,
  Title,
  Group,
  Text,
  Loader,
  Center,
  rem,
  getStylesRef,
  createStyles,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import ModalCarousel from '../../components/modal-carousel/ModalCarousel';
import { ProductProjection } from '@commercetools/platform-sdk';
import { storeService } from '../../services/StoreService/StoreService';
import { ErrorCodes, getErrorMessage } from '../../utils/helpers/error-handler';
import { notificationError } from '../../components/ui/notification';
import parse from 'html-react-parser';
import { formatPrice } from '../../utils/helpers/format-price';
import './detailed-product-page.scss';
import CartSelector from '../../components/cart-selector/CartSelector';

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

type DetailedProductPageProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailedProductPage = ({ isLoading, setIsLoading }: DetailedProductPageProps): JSX.Element => {
  const [product, setProduct] = useState<ProductProjection>();
  const { productID } = useParams();
  const { classes } = carouselStyles();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

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

                  <CartSelector product={product} isLoading={isLoading} setIsLoading={setIsLoading} />

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
