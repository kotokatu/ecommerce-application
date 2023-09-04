import { getFirstLetters } from '../../../utils/helpers/getFirstLetters';
import { UserProfile } from '../../../utils/types/serviceTypes';
import { Avatar, Col, Grid, Paper, Text, createStyles, Flex } from '@mantine/core';
import ProfileDataAddress from './addressData';
import { formStyles } from '../ProfilePage';

const ProfilePage = (userData: UserProfile) => {
  const { classes } = formStyles();
  const avatarLetters = getFirstLetters(userData?.firstName, userData?.lastName);

  return (
    <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
      <Grid gutter="md">
        <Col span={12} md={3}>
          <Flex gap="sm" justify="center" align="center" direction="column" className={classes.avatarContainer}>
            <div>
              <Avatar variant="filled" radius="xl" size="xl" src={null}>
                {avatarLetters}
              </Avatar>
              <Text align="center" className={classes.smallTitle}>
                {userData?.firstName} {userData?.lastName}
              </Text>
            </div>
          </Flex>
        </Col>
        <Col span={12} md={9}>
          <Flex gap="md" justify="center" align="center" direction="column">
            <Text className={classes.smallTitle}>Personal information</Text>
            <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
              <Text className={classes.smallTitle}>First Name</Text>
              <Text className={classes.text} color="gray">
                {userData?.firstName}
              </Text>
              <Text className={classes.smallTitle}>Last Name</Text>
              <Text className={classes.text} color="gray">
                {userData?.lastName}
              </Text>
              <Text className={classes.smallTitle}>Date of birth</Text>
              <Text className={classes.text} color="gray">
                {userData?.dateOfBirth}
              </Text>
              <Text className={classes.smallTitle}>Email</Text>
              <Text className={classes.text} color="gray">
                {userData?.email}
              </Text>
            </Paper>
          </Flex>
        </Col>
      </Grid>
      <Text className={classes.smallTitle} m={20} align="center">
        Addresses
      </Text>
      <Flex gap="sm" justify="center" align="start" direction="row" style={{ width: '100%' }}>
        <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
          <Text className={classes.smallTitle} align="center">
            Shipping Addresses
          </Text>
          {userData.shippingAddress.map((address, i) => (
            <ProfileDataAddress address={address} key={i} />
          ))}
        </Paper>
        <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
          <Text className={classes.smallTitle} align="center">
            Billing Addresses
          </Text>
          {userData.billingAddress.map((address, i) => (
            <ProfileDataAddress address={address} key={i} />
          ))}
        </Paper>
      </Flex>
    </Paper>
  );
};
export default ProfilePage;
