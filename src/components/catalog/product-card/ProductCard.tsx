import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    width: '300px',
    height: 'fit-content',
    cursor: 'pointer',
    padding: '0 1rem',

    '&:hover': {
      boxShadow: '1px 0px 30px -3px rgba(34, 60, 80, 0.21)',
    },
  },

  carousel: {
    '&:hover': {
      [`& .${getStylesRef('carouselControls')}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef('carouselControls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: rem(16),
    },
  },

  cardinfo: {
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
  },

  brand: {
    width: '100%',
    fontSize: '13px',
  },

  title: {
    width: '100%',
    flex: '1 1 auto',
  },

  footer: {
    width: '100%',
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'space-between',
  },

  button: {
    span: {
      color: 'white',
    },
  },
}));

type ProductCardProps = {
  product: ProductProjection;
  title: string;
};

const ProductCard = ({ product, title }: ProductCardProps) => {
  const { classes } = useStyles();

  const slides = product.masterVariant.images?.map((image) => (
    <Carousel.Slide key={image.url}>
      <Image src={image.url} height={400} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Card radius="md" withBorder p="xs" className={classes.card}>
        <Card.Section>
          <Carousel
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
          >
            {slides}
          </Carousel>
        </Card.Section>

        <Group className={classes.cardinfo}>
          <Text className={classes.brand}>
            {product.masterVariant.attributes?.map((attribute) =>
              attribute.name === 'brand' ? attribute.value.label : '',
            )}
          </Text>

          <Text className={classes.title}>{title}</Text>

          <div className={classes.footer}>
            <Text>{`${product.masterVariant.prices?.map((price) => price.value.centAmount / 100)} €`}</Text>
            <Button className={classes.button} radius="md" component={Link} to={`/catalog/product/${product.id}`}>
              View
            </Button>
          </div>
        </Group>
      </Card>
    </>
  );
};

export default ProductCard;
