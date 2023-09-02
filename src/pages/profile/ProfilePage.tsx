import {
  Avatar,
  Col,
  Grid,
  Paper,
  Text,
  Title,
  createStyles,
  Checkbox,
  Container,
  Flex,
  Button,
  TextInput,
  Select,
  PasswordInput,
} from '@mantine/core';
// import React from 'react';
import { userService } from '../../services/UserService/UserService';
import { getFirstLetters } from '../../utils/helpers/getFirstLetters';
import { UserProfile } from '../../utils/types/serviceTypes';
import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
//import Profile from './profile components/ProfileData';
import { useForm } from '@mantine/form';
import { emailRegex, passwordRegex, onlyLettersRegex, postalCodeRegex } from '../../utils/constants/validationRegex';
import { getAge } from '../../utils/helpers/date-helpers';
import { notificationError, notificationSuccess } from '../../components/ui/notification';
import ProfileEdit from './profile components/ProfileEditMode';

export const defaultData: UserProfile = {
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

const countryData = [
  { value: 'IT', label: 'Italy' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const userData = (await userService.getProfile()) as UserProfile;
      setProfile(userData);
    };
    getProfile();
  }, []);
  const avatarLetters = getFirstLetters(userData?.firstName, userData?.lastName);

  if (isEditMode === false) {
    //   return (
    //     <Container className={classes.container}>
    //       <Title className={classes.title} order={1} align="center" mb={20}>
    //         Your Profile
    //       </Title>
    //       <Profile userData={userData} />
    //     </Container>
    //   );
    // }
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
      <ProfileEdit {...userData} />
    </Container>
  );
};

export default ProfilePage;
