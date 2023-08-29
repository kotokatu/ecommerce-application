import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { ProductVariant } from '@commercetools/platform-sdk';

const useStyles = createStyles((theme) => ({
  card: {
    width: '260px',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '1px 0px 30px -3px rgba(34, 60, 80, 0.21)',
    },
  },

  price: {
    color: theme.black,
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
}));

type ProductCardProps = {
  product: ProductVariant;
  title: string;
};

const ProductCard = ({ product, title }: ProductCardProps) => {
  const { classes } = useStyles();

  const slides = product.images?.map((image) => (
    <Carousel.Slide key={image.label}>
      <Image src={image.url} height={330} />
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder className={classes.card}>
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

      <Group position="apart" mt="md">
        <Text fz="xs">
          {product.attributes?.map((attribute) => (attribute.name === 'brand' ? attribute.value.label : ''))}
        </Text>
      </Group>

      <Group position="apart" mt="md">
        <Text fz="md">{title}</Text>
      </Group>

      <Group position="apart" mt="md">
        <div>
          <Text fz="xl" span fw={500} className={classes.price}>
            {`${product.prices?.map((price) => price.value.centAmount / 100)} €`}
          </Text>
        </div>

        <Button radius="md">View</Button>
      </Group>
    </Card>
  );
};

export default ProductCard;
