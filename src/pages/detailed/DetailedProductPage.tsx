import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, SimpleGrid, Paper, Title, rem, createStyles } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { userService } from '../../services/UserService/UserService';
import { ProductProjection } from '@commercetools/platform-sdk';
import parse from 'html-react-parser';
import './detailed-product-page.scss';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
  },
  carousel: {
    width: '100%',
    maxWidth: rem(480),
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
  const [productData, setProductData] = useState<ProductProjection | undefined>();
  const { productKey } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getProduct(productKey as string);
      if (data) setProductData(data);
    };
    fetchData();
  }, [productKey]);

  const slides = (): JSX.Element[] | null => {
    if (productData?.masterVariant.images) {
      return productData?.masterVariant.images.map((image, ind) => (
        <Carousel.Slide
          key={'slide' + ind}
          className={classes.slide}
          sx={{ backgroundImage: `url(${image.url})` }}
        ></Carousel.Slide>
      ));
    }
    return null;
  };

  return (
    <Container className={classes.container} my="md" size="lg">
      <SimpleGrid cols={2} spacing={40} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Carousel className={classes.carousel} mx="auto" withIndicators>
          {slides()}
        </Carousel>
        <Grid gutter="md">
          <Grid.Col>
            <Paper>
              <Title order={5}>{productData?.name['en-US']}</Title>
              <Paper className="product-description">
                {productData?.description?.['en-US'] ? parse(productData?.description?.['en-US']) : ''}
              </Paper>
            </Paper>
          </Grid.Col>
          <Grid.Col span={12}></Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default DetailedProductPage;
