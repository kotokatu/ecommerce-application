import { Avatar, Col, Grid, Paper, Text, Title, createStyles, Container, Flex, Button } from '@mantine/core';
import React from 'react';
import { userService } from '../../services/UserService/UserService';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { getFirstLetters } from '../../utils/helpers/getFirstLetters';

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
    marginTop: 65,
    [theme.fn.smallerThan('md')]: {
      marginTop: 10,
    },
  },
}));

const ProfilePage: React.FC = () => {
  const { classes } = formStyles();
  const userData = userService.getCustomerData() as CustomerDraft;
  const avatarLetters = getFirstLetters(userData.firstName, userData.lastName);

  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" mb={20}>
        User Profile
      </Title>
      <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
        <Grid gutter="md">
          <Col span={12} md={3}>
            <Flex gap="md" justify="center" align="center" direction="column" className={classes.avatarContainer}>
              <Avatar variant="filled" radius="xl" size="lg" src={null}>
                {avatarLetters}
              </Avatar>
              <Text align="center" className={classes.smallTitle}>
                {userData?.firstName} {userData?.lastName}
              </Text>
              <Button type="submit" fullWidth>
                Edit
              </Button>
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
                <Text className={classes.smallTitle}>Second Name</Text>
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
              userData?.addresses[0].country
            </Text>
            <Text className={classes.smallTitle}>City</Text>
            <Text className={classes.text} color="gray">
              userData?.addresses[0].city
            </Text>
            <Text className={classes.smallTitle}>Street</Text>
            <Text className={classes.text} color="gray">
              userData?.addresses[0].streetName
            </Text>
            <Text className={classes.smallTitle}>Postal Code</Text>
            <Text color="gray">userData?.addresses[0].postalCode</Text>
          </Paper>
          <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
            <Text className={classes.smallTitle} align="center">
              Billing Address
            </Text>
            <Text className={classes.smallTitle}>Country</Text>
            <Text className={classes.text} color="gray">
              userData?.addresses[1].country
            </Text>
            <Text className={classes.smallTitle}>City</Text>
            <Text className={classes.text} color="gray">
              userData?.addresses[1].city
            </Text>
            <Text className={classes.smallTitle}>Street</Text>
            <Text className={classes.text} color="gray">
              userData?.addresses[1].streetName
            </Text>
            <Text className={classes.smallTitle}>Postal Code</Text>
            <Text className={classes.text} color="gray">
              userData?.addresses[1].postalCode
            </Text>
            <Text className={classes.text} color="red" align="center">
              *Used as default
            </Text>
          </Paper>
        </Flex>
      </Paper>
    </Container>
  );
};

const aa = {
  customer: {
    id: '572209d0-6d0f-43a5-a1d7-2b5a661e3043',
    version: 1,
    versionModifiedAt: '2023-08-28T07:28:48.945Z',
    lastMessageSequenceNumber: 1,
    createdAt: '2023-08-28T07:28:48.945Z',
    lastModifiedAt: '2023-08-28T07:28:48.945Z',
    lastModifiedBy: {
      clientId: 'OoukhLJaJweagUnRGY7tvzSO',
      isPlatformClient: false,
    },
    createdBy: {
      clientId: 'OoukhLJaJweagUnRGY7tvzSO',
      isPlatformClient: false,
    },
    email: 'qq@mail.com',
    firstName: 'qq',
    lastName: 'qwe',
    dateOfBirth: '2000-02-10',
    password: '****L4o=',
    addresses: [
      {
        id: 'hyCatAl5',
        streetName: 'ShippingOne',
        postalCode: '11111',
        city: 'ShippingOne',
        country: 'IT',
      },
      {
        id: 'fQL9NpOw',
        streetName: 'BillingTwo',
        postalCode: '22222',
        city: 'BillingTwo',
        country: 'IT',
      },
    ],
    defaultBillingAddressId: 'fQL9NpOw',
    shippingAddressIds: ['hyCatAl5'],
    billingAddressIds: ['fQL9NpOw'],
    isEmailVerified: false,
    stores: [],
    authenticationMode: 'Password',
  },
};

export default ProfilePage;
