import { Text, createStyles } from '@mantine/core';
import { FullAddressInfo } from '../../../utils/types/serviceTypes';

const formStyles = createStyles((theme) => ({
  title: {
    fontWeight: 800,
    fontSize: '30px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '20px',
    },
  },
  smallTitle: {
    fontWeight: 400,
    fontSize: '16px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '10px',
    },
  },
  text: {
    fontWeight: 400,
    fontSize: '15px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '9px',
    },
  },
}));

const ProfileDataAddress = (props: { address: FullAddressInfo; key: number }) => {
  const { classes } = formStyles();
  const address = props.address;

  return (
    <div>
      <Text className={classes.smallTitle}>Country</Text>
      <Text className={classes.text} color="gray">
        {address.country}
      </Text>
      <Text className={classes.smallTitle}>City</Text>
      <Text className={classes.text} color="gray">
        {address.city}
      </Text>
      <Text className={classes.smallTitle}>Address</Text>
      <Text className={classes.text} color="gray">
        {address.streetName}
      </Text>
      <Text className={classes.smallTitle}>Postal Code</Text>
      <Text className={classes.text} color="gray">
        {address.postalCode}
      </Text>
      <Text className={classes.text} color="red" align="center">
        {address.isDefault ? '* Used as default' : 'Not default'}
      </Text>
    </div>
  );
};
export default ProfileDataAddress;
