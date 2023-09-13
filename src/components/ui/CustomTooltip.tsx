import { Tooltip, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.colors.gray[1],
    color: theme.black,
    fontFamily: 'Montserrat',
    fontSize: rem(12),
    border: `solid ${rem(1)} ${theme.black}`,
    padding: `${rem(0)} ${rem(3)}`,
    borderRadius: rem(2),
  },
}));

type TooltipProps = {
  children: JSX.Element;
  label: string;
};
const CustomTooltip = ({ label, children }: TooltipProps) => {
  const { classes } = useStyles();
  return (
    <Tooltip classNames={classes} label={label}>
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
