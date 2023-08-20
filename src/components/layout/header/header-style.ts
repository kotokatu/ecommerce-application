import { createStyles } from '@mantine/core';

export const headerStyle = createStyles((theme) => ({
  title: {
    fontSize: '30px',
    fontWeight: 800,
    minWidth: '270px',
  },

  logo: {
    width: '250px',
    height: '60px',
  },

  root: {
    position: 'relative',
    zIndex: 1,
    marginBottom: '30px',
    padding: '20px 0',
  },

  dropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
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
