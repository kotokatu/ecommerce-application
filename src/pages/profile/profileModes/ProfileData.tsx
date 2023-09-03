import { getFirstLetters } from '../../../utils/helpers/getFirstLetters';
import { UserProfile } from '../../../utils/types/serviceTypes';
import { Avatar, Col, Grid, Paper, Text, createStyles, Flex } from '@mantine/core';

const formStyles = createStyles((theme) => ({
  container: {
    width: '700px',
  },
  title: {
    fontWeight: 800,
    fontSize: '30px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '20px',
    },
  },
  formWrapper: {
    padding: '1.5rem',
    [theme.fn.smallerThan('xs')]: {
      padding: '1rem',
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
  avatarContainer: {
    margin: 'auto',
    height: '100%',
    marginTop: '20px',
    [theme.fn.smallerThan('md')]: {
      marginTop: '10px',
      height: 'auto',
    },
  },
}));

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
            Shipping Address
          </Text>
          <Text className={classes.smallTitle}>Country</Text>
          <Text className={classes.text} color="gray">
            {userData?.shippingAddress.country}
          </Text>
          <Text className={classes.smallTitle}>City</Text>
          <Text className={classes.text} color="gray">
            {userData?.shippingAddress.city}
          </Text>
          <Text className={classes.smallTitle}>Address</Text>
          <Text className={classes.text} color="gray">
            {userData?.shippingAddress.streetName}
          </Text>
          <Text className={classes.smallTitle}>Postal Code</Text>
          <Text className={classes.text} color="gray">
            {userData?.shippingAddress.postalCode}
          </Text>
          <Text className={classes.text} color="red" align="center">
            {userData?.shippingAddressAsDefault ? '* Used as default' : 'Not default'}
          </Text>
        </Paper>
        <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
          <Text className={classes.smallTitle} align="center">
            Billing Address
          </Text>
          <Text className={classes.smallTitle}>Country</Text>
          <Text className={classes.text} color="gray">
            {userData?.billingAddress.country}
          </Text>
          <Text className={classes.smallTitle}>City</Text>
          <Text className={classes.text} color="gray">
            {userData?.billingAddress.city}
          </Text>
          <Text className={classes.smallTitle}>Address</Text>
          <Text className={classes.text} color="gray">
            {userData?.billingAddress.streetName}
          </Text>
          <Text className={classes.smallTitle}>Postal Code</Text>
          <Text className={classes.text} color="gray">
            {userData?.billingAddress.postalCode}
          </Text>
          <Text className={classes.text} color="red" align="center">
            {userData?.billingAddressAsDefault ? '* Used as default' : 'Not default'}
          </Text>
        </Paper>
      </Flex>
    </Paper>
  );
};
export default ProfilePage;
