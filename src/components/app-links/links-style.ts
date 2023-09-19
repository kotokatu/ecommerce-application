import { createStyles, rem } from '@mantine/core';

export const linksStyle = createStyles((theme) => ({
  link: {
    fontSize: 'initial',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(22)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark[9],
    height: '43px',
    transition: '300ms',

    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&,&:hover': {
      backgroundColor: theme.fn.variant({ variant: 'dark', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'dark', color: theme.primaryColor }).color,
    },
  },

  user: {
    cursor: 'pointer',
    height: '43px',
    padding: `${rem(8)} ${rem(22)}`,
    borderRadius: theme.radius.sm,
    transition: '300ms',

    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },
  },

  icon: {
    position: 'relative',
  },

  productcount: {
    fontSize: '13px',
    color: 'black',
    position: 'absolute',
    top: '13px',
    left: '24px',
    backgroundColor: 'pink',
    borderRadius: '100%',
    minWidth: '20px',
    width: 'fit-content',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  basket: {
    fontSize: 'initial',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(22)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark[9],
    height: '43px',
    transition: '300ms',

    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },
  },

  basketActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'dark', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'dark', color: theme.primaryColor }).color,
    },
  },
}));
