import { createStyles, Text, rem } from '@mantine/core';
import AnimatedDeveloper from './animatedDeveloper';

const useStyles = createStyles((theme) => ({
  feature: {
    position: 'relative',
    paddingTop: rem(0),
    paddingLeft: rem(0),
  },

  overlay: {
    position: 'absolute',
    height: rem(120),
    width: rem(180),
    top: 0,
    left: 0,
    zIndex: -1,
  },

  content: {
    position: 'relative',
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
  },
}));

interface DeveloperProps extends React.ComponentPropsWithoutRef<'div'> {
  name: string;
  greeting: string;
  description: string;
  conclusion: string;
  gitLink: string;
}

function Developer({ name, greeting, description, className, conclusion, gitLink }: DeveloperProps) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)}>
      <div className={classes.overlay}>
        <div className={name} />
      </div>
      <AnimatedDeveloper name={name} />
      <div className={classes.content}>
        <Text fw={700} fz="lg" mb="xs" mt={5} c="white">
          {name}
        </Text>
        <Text c="black" fz="sm">
          {greeting}
        </Text>
        <Text c="dimmed" fz="sm" mt={10}>
          {description}
        </Text>
        <Text c="red" fz="sm" mt={10}>
          {conclusion}
        </Text>
      </div>
    </div>
  );
}

export default Developer;
