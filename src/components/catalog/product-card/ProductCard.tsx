import { createStyles, Image, Card, Text, Group, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { ProductProjection } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
import { formatPrice } from '../../../utils/helpers/format-price';
import Popup from '../popup/Popup';

const useStyles = createStyles(() => ({
  card: {
    width: '300px',
    height: 'fit-content',

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
    '& [data-inactive]': {
      opacity: 0,
      visibility: 'hidden',
      cursor: 'default',
    },
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
    flexDirection: 'row',
    alignContent: 'space-between',
    height: '130px',
    gap: '16px',
  },

  brand: {
    display: '-webkit-box',
    width: '100%',
    fontSize: '12px',
    lineHeight: '1.1',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    margin: 0,

    '& p:first-of-type': {
      margin: 0,
    },

    '& :not(p:first-of-type)': {
      display: 'none',
    },
  },

  title: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '1.2',
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
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductCard = ({ product, isLoading, setIsLoading }: ProductCardProps) => {
  const { classes } = useStyles();

  const slides = product.masterVariant.images?.map((image) => (
    <Carousel.Slide key={image.url}>
      <Image src={image.url} height={400} />
    </Carousel.Slide>
  ));

  return (
    <>
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

        <Group className={classes.cardinfo}>
          <Group className={classes.title} spacing={0}>
            <Text ff="Montserrat" size="14px" mb="15px" lh={1} fw={400}>{`${product.masterVariant.attributes?.find(
              (attribute) => attribute.name === 'brand',
            )?.value}`}</Text>
            <NavLink to={`/catalog/product/${product.id}`}>
              <Text ff="Montserrat" lh={1} fw={600}>{`${product.name['en-US']}`}</Text>
            </NavLink>
          </Group>

          <Group className={classes.footer}>
            <Group spacing="xs">
              {product.masterVariant.prices?.[0].discounted && (
                <Text color="red">{`${formatPrice(
                  product.masterVariant.prices[0].discounted.value.centAmount / 100,
                )} €`}</Text>
              )}
              <Text strikethrough={!!product.masterVariant.prices?.[0].discounted}>
                {`${product.masterVariant.prices && product.masterVariant.prices[0].value.centAmount / 100} €`}
              </Text>
            </Group>
            <Group spacing="xs">
              <Popup product={product} isLoading={isLoading} setIsLoading={setIsLoading} />
            </Group>
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default ProductCard;
