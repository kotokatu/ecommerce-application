import {
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
import { userService } from '../../../services/UserService/UserService';
import { UserProfile } from '../../../utils/types/serviceTypes';
import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { emailRegex, passwordRegex, onlyLettersRegex, postalCodeRegex } from '../../../utils/constants/validationRegex';
//import { getAge } from '../../../utils/helpers/date-helpers';
import { notificationError, notificationSuccess } from '../../../components/ui/notification';

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

const countryData = [
  { value: 'IT', label: 'Italy' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

const ProfileEdit = (userData: UserProfile) => {
  const { classes } = formStyles();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
      shippingAddress: {
        country: userData.shippingAddress.country || 'No data',
        city: userData.shippingAddress.city || 'No data',
        streetName: userData.shippingAddress.streetName || 'No data',
        postalCode: userData.shippingAddress.postalCode || 'No data',
      },
      billingAddress: {
        country: userData.billingAddress.country || 'No data',
        city: userData.billingAddress.city || 'No data',
        streetName: userData.billingAddress.streetName || 'No data',
        postalCode: userData.billingAddress.postalCode || 'No data',
      },
      setDefaultShippingAddress: userData?.shippingAddressAsDefault,
      setDefaultBillingAddress: userData?.billingAddressAsDefault,
      copyShippingToBilling: false,
    },

    validate: {
      email: (value) => (emailRegex.test(value) ? null : 'Should be a valid email'),
      password: (value) =>
        passwordRegex.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only Latin letters are allowed.',
      firstName: (value) =>
        onlyLettersRegex.test(value) ? null : 'First name should only contain letters and cannot be empty',
      lastName: (value) =>
        onlyLettersRegex.test(value) ? null : 'Last name should only contain letters and cannot be empty',
      dateOfBirth: (value) => (!value ? 'Age must be greater than or equal to 13' : null),
      shippingAddress: {
        country: (value) => (value ? null : 'Please choose a country'),
        city: (value) => (onlyLettersRegex.test(value) ? null : 'City should only contain letters and cannot be empty'),
        streetName: (value) => (value.trim() ? null : 'Address cannot be empty'),
        postalCode: (value) => (postalCodeRegex.test(value) ? null : 'Should be a valid postal code (5 digits)'),
      },
      billingAddress: {
        country: (value, values) => (values.copyShippingToBilling ? null : value ? null : 'Please choose a country'),
        city: (value, values) =>
          values.copyShippingToBilling
            ? null
            : onlyLettersRegex.test(value)
            ? null
            : 'City should only contain letters and cannot be empty',
        streetName: (value, values) =>
          values.copyShippingToBilling ? null : value.trim() ? null : 'Address cannot be empty',
        postalCode: (value, values) =>
          values.copyShippingToBilling
            ? null
            : postalCodeRegex.test(value)
            ? null
            : 'Should be a valid postal code (5 digits)',
      },
    },
    validateInputOnChange: true,
  });
  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" mb={20}>
        Your Profile
      </Title>
      <form
        onSubmit={form.onSubmit(async () => {
          setIsLoading(true);
          console.log(3477734);
          try {
            console.log(3434);
            notificationSuccess('Account was succesfully updated');
          } catch (err) {
            if (err instanceof Error) notificationError(err.message);
          } finally {
            setIsLoading(false);
          }
        })}
      >
        <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
          <Flex gap="md" justify="center" align="center" direction="column">
            <Text className={classes.smallTitle}>Personal information</Text>
            <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
              <TextInput
                className={classes.smallTitle}
                placeholder={userData?.firstName}
                label="First Name"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                className={classes.smallTitle}
                label="Last Name"
                placeholder={userData?.lastName}
                {...form.getInputProps('lastName')}
              />
              <PasswordInput
                pt={10}
                withAsterisk
                autoComplete="current-password"
                label="Password"
                placeholder="Password"
                {...form.getInputProps('password')}
              />
              {/* <DatePickerInput
                valueFormat="DD.MM.YYYY"
                label="Date of birth"
                placeholder={userData?.dateOfBirth}
                {...form.getInputProps('dateOfBirth')}
              /> */}
              <TextInput
                className={classes.smallTitle}
                placeholder={userData?.dateOfBirth}
                mb={10}
                label="Date of birth"
                {...form.getInputProps('dateOfBirth')}
              />
              <TextInput
                className={classes.smallTitle}
                placeholder={userData?.email}
                mb={10}
                label="Email"
                {...form.getInputProps('email')}
              />
            </Paper>
          </Flex>
          <Text className={classes.smallTitle} m={20} align="center">
            Addresses
          </Text>
          <Flex gap="sm" justify="center" align="start" direction="column" style={{ width: '100%' }} mb={15}>
            <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
              <Text className={classes.smallTitle} align="center">
                Shipping Address
              </Text>
              <Select
                withAsterisk
                label="Country"
                data={countryData}
                placeholder="Choose country"
                {...form.getInputProps('shippingAddress.country')}
              />
              <TextInput
                withAsterisk
                pt={10}
                label="City"
                placeholder="City"
                {...form.getInputProps('shippingAddress.city')}
              />
              <TextInput
                withAsterisk
                pt={10}
                label="Address"
                placeholder="Address"
                {...form.getInputProps('shippingAddress.streetName')}
              />
              <TextInput
                withAsterisk
                pt={10}
                label="Postal Code"
                placeholder="Postal Code"
                {...form.getInputProps('shippingAddress.postalCode')}
              />
              <Checkbox
                m={10}
                label="Set as default shipping address"
                {...form.getInputProps('setDefaultShippingAddress')}
              />
            </Paper>
            <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
              <Text className={classes.smallTitle} align="center">
                Billing Address
              </Text>
              <Select
                withAsterisk
                label="Country"
                data={countryData}
                placeholder="Choose country"
                {...form.getInputProps('billingAddress.country')}
              />
              <TextInput
                withAsterisk
                pt={10}
                label="City"
                placeholder="City"
                {...form.getInputProps('billingAddress.city')}
              />
              <TextInput
                withAsterisk
                pt={10}
                label="Address"
                placeholder="Address"
                {...form.getInputProps('billingAddress.streetName')}
              />
              <TextInput
                withAsterisk
                pt={10}
                label="Postal Code"
                placeholder="Postal Code"
                {...form.getInputProps('billingAddress.postalCode')}
              />
              <Checkbox
                m={10}
                label="Set as default billing address"
                {...form.getInputProps('setDefaultBillingAddress')}
              />
            </Paper>
          </Flex>

          <Button fullWidth type="submit" loading={isLoading}>
            Save Changes
          </Button>
          <Button variant="outline" fullWidth mt={5} color="red">
            Cancel
          </Button>
        </Paper>
      </form>
    </Container>
  );
};
export default ProfileEdit;
