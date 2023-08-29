import { createStyles } from '@mantine/core';

export const headerStyle = createStyles((theme) => ({
  header: {
    position: 'relative',
    zIndex: 1,
    marginBottom: '10px',
    padding: '20px 0',
  },

  title: {
    fontSize: '30px',
    fontWeight: 800,
    minWidth: '270px',
  },

  logobox: {
    width: '250px',
    height: '60px',
    display: 'flex',
  },

  logo: {
    width: '60px',
    marginRight: '10px',
  },

  titlebox: {
    fontFamily: 'Days-One',
    width: '190px',
    height: '60px',
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
    top: 80,
    left: 0,
    right: 0,
    zIndex: 0,
    height: '90vh',
    textAlign: 'center',
    fontSize: '25px',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
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
  },

  userLinks: {
    minWidth: '270px',
    justifyContent: 'flex-end',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
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
