import { useEffect, useState } from 'react';
import { Container, Grid, SimpleGrid, Paper, Title, Text, rem, createStyles } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { userService } from '../../services/UserService/UserService';
import { ProductProjection } from '@commercetools/platform-sdk';
import parse from 'html-react-parser';

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

const DetailedProductPage = () => {
  const { classes } = useStyles();
  const [productData, setProductData] = useState<ProductProjection | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getProduct('jacket-02');
      if (data) setProductData(data);
    };
    fetchData();
  }, []);

  return (
    <Container className={classes.container} my="md" size="lg">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Carousel className={classes.carousel} mx="auto" withIndicators>
          <Carousel.Slide
            className={classes.slide}
            sx={{ backgroundImage: `url(${productData?.masterVariant?.images?.[0]?.url})` }}
          ></Carousel.Slide>
          <Carousel.Slide
            className={classes.slide}
            sx={{ backgroundImage: `url(${productData?.masterVariant?.images?.[1]?.url})` }}
          ></Carousel.Slide>
          <Carousel.Slide
            className={classes.slide}
            sx={{ backgroundImage: `url(${productData?.masterVariant?.images?.[2]?.url})` }}
          ></Carousel.Slide>
        </Carousel>
        <Grid gutter="md">
          <Grid.Col>
            <Paper>
              <Title order={5}>{productData?.name['en-US']}</Title>
              <Text>{productData?.description?.['en-US'] ? parse(productData?.description?.['en-US']) : ''}</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={12}></Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default DetailedProductPage;
