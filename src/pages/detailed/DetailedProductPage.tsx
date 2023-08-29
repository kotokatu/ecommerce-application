import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, SimpleGrid, Paper, Button, Select, Title, rem, createStyles } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { userService } from '../../services/UserService/UserService';
import { ProductProjection } from '@commercetools/platform-sdk';
import parse from 'html-react-parser';
import './detailed-product-page.scss';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    fontFamily: 'Montserrat',
  },
  carousel: {
    width: '100%',
    maxWidth: rem(480),
    margin: 'auto',
  },
  slide: {
    height: rem(600),
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',

    [theme.fn.smallerThan('md')]: {
      height: rem(500),
    },
  },
}));

const DetailedProductPage = (): JSX.Element => {
  const { classes } = useStyles();
  const [product, setProduct] = useState<ProductProjection>();
  const { productKey } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getProduct(productKey as string);
      if (data) setProduct(data);
    };
    fetchData();
  }, [productKey]);

  const slides = (product: ProductProjection): JSX.Element[] | null => {
    if (product.masterVariant.images) {
      return product?.masterVariant.images.map((image, ind) => (
        <Carousel.Slide key={'slide' + ind} className={classes.slide} sx={{ backgroundImage: `url(${image.url})` }} />
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
    <Container className={classes.container} my="md" size="lg">
      {product ? (
        <SimpleGrid cols={2} spacing={40} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Carousel className={classes.carousel} withIndicators>
            {slides(product)}
          </Carousel>
          <Grid gutter="md">
            <Grid.Col>
              <Paper>
                <Title order={4}>
                  {product.masterVariant.attributes?.find((attribute) => attribute.name === 'brand')?.value.label}
                </Title>
                <Title order={6} sx={{ fontFamily: 'Montserrat' }}>
                  {product.name['en-US']}
                </Title>
                <Title order={6} mt="md" sx={{ fontFamily: 'Montserrat' }}>
                  {product.masterVariant.prices ? '€' + product.masterVariant.prices[0].value.centAmount / 100 : 0}
                </Title>
                <Select mt="md" mb="md" withinPortal data={productSizes(product)} placeholder="Select size" />
                <Button>Add To Cart</Button>
                <Paper sx={{ fontSize: '13px' }} className="product-description">
                  {product?.description?.['en-US'] ? parse(product?.description?.['en-US']) : ''}
                </Paper>
              </Paper>
            </Grid.Col>
            <Grid.Col span={12}></Grid.Col>
          </Grid>
        </SimpleGrid>
      ) : (
        <Title>Loading</Title>
      )}
    </Container>
  );
};

export default DetailedProductPage;
