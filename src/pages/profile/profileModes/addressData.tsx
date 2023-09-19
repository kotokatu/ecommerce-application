import { Text, Paper } from '@mantine/core';
import { FullAddressInfo } from '../../../utils/types/serviceTypes';
import { formStyles } from '../ProfilePage';

const ProfileDataAddress = (props: { address: FullAddressInfo; key: number }) => {
  const { classes } = formStyles();
  const address = props.address;

  return (
    <Paper withBorder mb={10} p={10} shadow="xs">
      <Text className={classes.smallTitle} align="center">
        Address:
      </Text>
      <Text className={classes.text} color="red" align="right">
        {address.isDefault ? '* Used as default' : 'Not default'}
      </Text>
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
    </Paper>
  );
};
export default ProfileDataAddress;
