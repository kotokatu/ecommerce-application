import { createStyles } from '@mantine/core';

export const headerStyle = createStyles((theme) => ({
  header: {
    position: 'relative',
    zIndex: 3,
    padding: '20px 1rem',
  },

  title: {
    fontSize: '30px',
    fontWeight: 800,
    minWidth: '250px',

    [theme.fn.smallerThan('492')]: {
      minWidth: 'auto',
    },
  },

  logobox: {
    width: '250px',
    height: '60px',
    display: 'flex',

    [theme.fn.smallerThan('492')]: {
      width: 'auto',
    },
  },

  logo: {
    width: '60px',
    marginRight: '10px',
  },

  titlebox: {
    fontFamily: 'Days-One',
    width: '190px',
    height: '60px',

    [theme.fn.smallerThan('492')]: {
      display: 'none',
    },
  },

  topTitle: {
    margin: '0',
    lineHeight: '1',
    paddingTop: '3px',
    fontSize: '25px',
  },

  downTitle: {
    margin: '0',
    lineHeight: '1',
    fontSize: '9.5px',
  },

  dropdown: {
    position: 'absolute',
    zIndex: 5,
    top: 80,
    left: 0,
    right: 0,
    height: '90vh',
    textAlign: 'center',
    fontSize: '25px',
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  container: {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: 0,
  },

  userLinks: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    minWidth: '250px',
    justifyContent: 'flex-end',
    gap: '.5rem',

    [theme.fn.smallerThan('sm')]: {
      minWidth: 'auto',
      flex: '1 1 auto',
      paddingRight: '10px',
    },
  },

  menuLinks: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));
