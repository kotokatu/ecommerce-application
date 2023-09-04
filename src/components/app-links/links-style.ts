import { createStyles, rem } from '@mantine/core';

export const linksStyle = createStyles((theme) => ({
  link: {
    fontSize: 'initial',
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark[9],

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
