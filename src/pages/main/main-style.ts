import { createStyles } from '@mantine/core';

export const mainPageStyle = createStyles((theme) => ({
  container: {
    display: 'block',
    position: 'absolute',
    left: 0,
    width: '100%',
    maxWidth: '100%',
    padding: '0',
  },

  promo: {
    width: '100%',
    padding: theme.spacing.xs,
    textAlign: 'center',
    color: theme.white,
    backgroundColor: theme.black,
  },

  promoContent: {
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  promoSub: {
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: theme.fontSizes.xs,
  },

  links: {
    width: '125px',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRight: '0.0625rem solid #e9ecef',
  },

  content: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
  },
}));
