import { createStyles, rem } from '@mantine/core';

export const dropdownStyles = createStyles((theme) => ({
  button: {
    fontWeight: 500,
    display: 'block',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    width: '100%',
    color: theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  container: {
    maxHeight: '120px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',

    '&::-webkit-scrollbar': {
      width: '4px',
      height: 0,
    },

    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: '#e9ecef',
    },
  },

  item: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.black,
    borderLeft: `${rem(1)} solid ${theme.colors.gray[3]}`,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  pricedropdown: {
    padding: '0 10px',
  },

  sliderbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    padding: '0 10px',
  },

  slider: {
    width: '100%',
    height: '10px',
    backgroundColor: theme.colors.gray[0],
    cursor: 'pointer',

    '& .track-1': {
      height: '10px',
      backgroundColor: theme.black,
    },

    '& .thumb': {
      top: '-5px',
      width: '20px',
      height: '20px',
      borderRadius: '100%',
      backgroundColor: theme.black,
    },

    '& .thumb-0': {
      transform: 'translateX(-2px)',
    },

    '& .thumb-1': {
      transform: 'translateX(2px)',
    },
  },

  inputbox: {
    display: 'flex',
    gap: '10px',
  },
}));
