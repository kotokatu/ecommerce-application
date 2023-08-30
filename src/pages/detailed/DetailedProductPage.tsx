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
  rem,
  getStylesRef,
  Loader,
  useMantineTheme,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { ProductProjection } from '@commercetools/platform-sdk';
import { productService } from '../../services/ProductService/ProductService';
import parse from 'html-react-parser';
import './detailed-product-page.scss';

const DetailedProductPage = (): JSX.Element => {
  const [product, setProduct] = useState<ProductProjection>();
  const { productKey } = useParams();
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await productService.getProduct(productKey as string);
      if (data) setProduct(data);
    };
    fetchData();
  }, [productKey]);

  const slides = (product: ProductProjection): JSX.Element[] | null => {
    if (product.masterVariant.images) {
      return product?.masterVariant.images.map((image, ind) => (
        <Carousel.Slide key={'slide' + ind} sx={{ backgroundImage: `url(${image.url})` }} />
      ));
    }
    return null;
  };

  const productSizes = (product: ProductProjection): string[] => {
    return [
      product.masterVariant.attributes?.find((attribute) => attribute.name === 'size')?.value.label,
      ...product.variants.map(
        (variant) => variant.attributes?.find((attribute) => attribute.name === 'size')?.value.label,
      ),
    ];
  };

  return (
    <Container w="100%" my="md" px={0} size="lg">
      {product ? (
        <SimpleGrid cols={2} spacing={40} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Carousel
            styles={{
              root: {
                width: '100%',
                maxWidth: rem(480),
                margin: 'auto',
                '&:hover': {
                  [`& .${getStylesRef('controls')}:not([data-inactive])`]: {
                    opacity: 1,
                  },
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

                [theme.fn.smallerThan('md')]: {
                  height: rem(500),
                },
              },
            }}
            withIndicators
          >
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
                <Title order={6} mt="md" ff="Montserrat">
                  {product.masterVariant.prices ? product.masterVariant.prices[0].value.centAmount / 100 + ' €' : 0}
                </Title>
                <Select my="md" maw={450} withinPortal data={productSizes(product)} placeholder="Select size" />
                <Button>Add To Cart</Button>
                <Paper fz={13} className="product-description" ff="Montserrat">
                  {product?.description?.['en-US'] ? parse(product?.description?.['en-US']) : ''}
                </Paper>
              </Paper>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      ) : (
        <Loader variant="bars" size="xl" display="block" mx="auto" />
      )}
    </Container>
  );
};

export default DetailedProductPage;
