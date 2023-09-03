import { createStyles, getStylesRef, rem } from '@mantine/core';

export const inputStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
    '&:hover': {
      [`& .${getStylesRef('rightSection')}`]: {
        opacity: 0.7,
      },
    },
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: rem(7),
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating ? theme.black : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },

  rightSection: {
    ref: getStylesRef('rightSection'),
    opacity: 0,
    transition: '300ms ease',
  },
}));
