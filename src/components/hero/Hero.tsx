import { Title, Text, Container, Button, createStyles, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import HeroImage from '../../assets/img/hero_image.jpg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '700px',
    paddingTop: '350px',
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',

    [theme.fn.smallerThan('xs')]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
    },
  },

  inner: {
    width: '80%',
    maxWidth: rem(800),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },

  title: {
    fontWeight: 300,
    fontSize: rem(55),
    color: theme.black,
    opacity: 0.5,
    textAlign: 'center',
    fontFamily: `Montserrat, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  description: {
    color: theme.colors.black,
    opacity: 0.5,
    textAlign: 'center',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    fontSize: rem(40),
    fontWeight: 200,
    fontStyle: 'italic',

    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.fontSizes.md,
      textAlign: 'center',
    },
  },

  controls: {
    marginTop: theme.spacing.sm,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  control: {
    height: rem(42),
    fontSize: theme.fontSizes.md,
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    backgroundColor: '#fff',
    borderRadius: 0,
    opacity: 0.8,
    transition: '.3s',

    '&:hover': {
      opacity: 1,
    },

    [theme.fn.smallerThan('xs')]: {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export const Hero = forwardRef<HTMLDivElement>(function Hero(_, ref) {
  const { classes } = useStyles();

  return (
    <div ref={ref} className={classes.wrapper}>
      <div className={classes.inner}>
        <Title className={classes.title}>NEW COLLECTION</Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            AUTUMN
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg" component={Link} to="/catalog">
            Shop
          </Button>
        </div>
      </div>
    </div>
  );
});
