import { createStyles, rem } from '@mantine/core';

export const mainStyle = createStyles((theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    padding: '0',
  },

  menuItems: {
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

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark[9],
    fontSize: 'initial',
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'dark', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'dark', color: theme.primaryColor }).color,
    },
  },
}));
