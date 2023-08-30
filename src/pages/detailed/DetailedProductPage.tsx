import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  SimpleGrid,
  Paper,
  Button,
  Select,
  Title,
  Group,
  Text,
  rem,
  getStylesRef,
  Loader,
  Center,
  createStyles,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { productService } from '../../services/ProductService/ProductService';
import parse from 'html-react-parser';
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
  slide: {
    height: rem(650),
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',

    [theme.fn.smallerThan('xs')]: {
      height: rem(420),
    },
  },
}));

const slides = (product: ProductProjection): JSX.Element[] | null => {
  if (product.masterVariant.images) {
    return product.masterVariant.images.map((image, ind) => (
      <Carousel.Slide key={'slide' + ind} sx={{ backgroundImage: `url(${image.url})` }} />
    ));
  }
  return null;
};
const getSizeData = (variant: ProductVariant): string =>
  variant.attributes?.find((attribute) => attribute.name === 'size')?.value.label;
const productSizes = (product: ProductProjection): string[] => {
  return [getSizeData(product.masterVariant), ...product.variants.map((variant) => getSizeData(variant))];
};

const DetailedProductPage = (): JSX.Element => {
  const [product, setProduct] = useState<ProductProjection>();
  const { productKey } = useParams();
  const { classes } = carouselStyles();

  useEffect(() => {
    const fetchData = async () => {
      const data = await productService.getProduct(productKey as string);
      if (data) setProduct(data);
    };
    fetchData();
  }, [productKey]);

  return (
    <Container w="100%" h="100%" my="md" size="lg">
      {product ? (
        <SimpleGrid cols={2} spacing={40} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          <Carousel classNames={classes} withIndicators loop>
            {slides(product)}
          </Carousel>
          <Grid gutter="md">
            <Grid.Col>
              <Paper>
                <Title order={4}>
                  {product.masterVariant.attributes?.find((attribute) => attribute.name === 'brand')?.value.label}
                </Title>
                <Title order={6} ff="Montserrat">
                  {product.name['en-US']}
                </Title>
                <Group spacing="xs">
                  {product.masterVariant.prices?.[0].discounted && (
                    <Text mt="md" fw={700} ff="Montserrat" color="red">
                      {product.masterVariant.prices[0].discounted.value.centAmount / 100 + ' €'}
                    </Text>
                  )}
                  <Text mt="md" ff="Montserrat" fw={700} strikethrough={!!product.masterVariant.prices?.[0].discounted}>
                    {product.masterVariant.prices && product.masterVariant.prices[0].value.centAmount / 100 + ' €'}
                  </Text>
                </Group>
                <Select my="md" maw={450} withinPortal data={productSizes(product)} placeholder="Select size" />
                <Button>Add To Cart</Button>
                <Paper fz={13} className="product-description" ff="Montserrat">
                  {product.description?.['en-US'] && parse(product.description['en-US'])}
                </Paper>
              </Paper>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      ) : (
        <Center h="100%">
          <Loader variant="bars" size="xl" display="block" mx="auto" />
        </Center>
      )}
    </Container>
  );
};

export default DetailedProductPage;
