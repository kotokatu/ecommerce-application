import { createStyles } from '@mantine/core';

export const mainPageStyle = createStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    padding: '0',
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
