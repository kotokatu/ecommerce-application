import { Avatar, Col, Grid, Paper, Text, Title, createStyles, Container, Flex, Button, TextInput } from '@mantine/core';
// import React from 'react';
import { userService } from '../../services/UserService/UserService';
import { getFirstLetters } from '../../utils/helpers/getFirstLetters';
import { UserProfile } from '../../utils/types/serviceTypes';
import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

const defaultData: UserProfile = {
  email: 'No data',
  password: 'No data',
  firstName: 'No data',
  lastName: 'No data',
  dateOfBirth: 'No data',
  shippingAddress: { country: 'No data' },
  billingAddress: { country: 'No data' },
  shippingAddressAsDefault: false,
  billingAddressAsDefault: false,
};

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

const ProfilePage = () => {
  const [userData, setProfile] = useState<UserProfile>(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);
  const { classes } = formStyles();

  useEffect(() => {
    const getProfile = async () => {
      const userData = (await userService.getProfile()) as UserProfile;
      setProfile(userData);
    };
    getProfile();
  }, []);
  const avatarLetters = getFirstLetters(userData?.firstName, userData?.lastName);
  if (isEditMode === false) {
    return (
      <Container className={classes.container}>
        <Title className={classes.title} order={1} align="center" mb={20}>
          Your Profile
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
                <Button type="submit" fullWidth onClick={() => setIsEditMode(true)}>
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
              <Text color="gray">{userData?.shippingAddress.postalCode}</Text>
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
      </Container>
    );
  }
  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" mb={20}>
        Your Profile
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
              <Button type="submit" variant="outline" fullWidth onClick={() => setIsEditMode(false)} color="red">
                Save
              </Button>
            </Flex>
          </Col>
          <Col span={12} md={9}>
            <Flex gap="md" justify="center" align="center" direction="column">
              <Text className={classes.smallTitle}>Personal information</Text>
              <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
                <Text className={classes.smallTitle}>First Name</Text>
                <TextInput className={classes.smallTitle} placeholder={userData?.firstName} />
                <Text className={classes.smallTitle}>Second Name</Text>
                <TextInput className={classes.smallTitle} placeholder={userData?.lastName} />
                <Text className={classes.smallTitle}>Date of birth</Text>
                <DatePickerInput valueFormat="DD.MM.YYYY" placeholder={userData?.dateOfBirth} />
                <Text className={classes.smallTitle}>Email</Text>
                <TextInput className={classes.smallTitle} placeholder={userData?.email} mb={10} />
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
            <TextInput className={classes.smallTitle} placeholder={userData?.shippingAddress.country} />
            <Text className={classes.smallTitle}>City</Text>
            <TextInput className={classes.smallTitle} placeholder={userData?.shippingAddress.city} />
            <Text className={classes.smallTitle}>Address</Text>
            <TextInput className={classes.smallTitle} placeholder={userData?.shippingAddress.streetName} />
            <Text className={classes.smallTitle}>Postal Code</Text>
            <TextInput className={classes.smallTitle} placeholder={userData?.shippingAddress.postalCode} />
            <Text className={classes.text} color="red" align="center">
              {userData?.shippingAddressAsDefault ? '* Used as default' : 'Not default'}
            </Text>
          </Paper>
          <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
            <Text className={classes.smallTitle} align="center">
              Billing Address
            </Text>
            <Text className={classes.smallTitle}>Country</Text>
            <TextInput className={classes.smallTitle} placeholder={userData?.billingAddress.country} />
            <Text className={classes.smallTitle}>City</Text>
            <TextInput className={classes.smallTitle} placeholder={userData?.billingAddress.city} />
            <Text className={classes.smallTitle}>Address</Text>
            <TextInput className={classes.smallTitle} placeholder={userData?.billingAddress.streetName} />
            <Text className={classes.smallTitle}>Postal Code</Text>
            <TextInput className={classes.smallTitle} placeholder={userData?.billingAddress.postalCode} />
            <Text className={classes.text} color="red" align="center">
              {userData?.billingAddressAsDefault ? '* Used as default' : 'Not default'}
            </Text>
          </Paper>
        </Flex>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
