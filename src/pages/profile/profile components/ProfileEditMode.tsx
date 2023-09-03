import {
  Paper,
  Text,
  createStyles,
  Checkbox,
  Container,
  Flex,
  Button,
  TextInput,
  Select,
  PasswordInput,
  Modal,
  Group,
} from '@mantine/core';
import { userService } from '../../../services/UserService/UserService';
import { UserProfile } from '../../../utils/types/serviceTypes';
import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { emailRegex, passwordRegex, onlyLettersRegex, postalCodeRegex } from '../../../utils/constants/validationRegex';
//import { getAge } from '../../../utils/helpers/date-helpers';
import { notificationError, notificationSuccess } from '../../../components/ui/notification';
import { useDisclosure } from '@mantine/hooks';

const formStyles = createStyles((theme) => ({
  container: {
    width: '100%',
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
}));

const countryData = [
  { value: 'IT', label: 'Italy' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

const ProfileEdit = (userData: UserProfile) => {
  const { classes } = formStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: userData.email,
      //password: userData.password,
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
      // password: (value) =>
      //   passwordRegex.test(value)
      //     ? null
      //     : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only Latin letters are allowed.',
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

  const passwordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },

    validate: {
      currentPassword: (value) =>
        passwordRegex.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only Latin letters are allowed.',
      newPassword: (value) =>
        passwordRegex.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only Latin letters are allowed.',
    },
    validateInputOnChange: true,
  });

  return (
    <Container className={classes.container}>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setIsLoading(true);
          userService.changePassword({ version: userData.version, newPassword: 'f', currentPassword: 'f' });
          console.log(3477734);
          try {
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
              <Modal opened={opened} onClose={close} title="Change a Password" centered>
                <form
                  onSubmit={passwordForm.onSubmit(async (values) => {
                    setIsLoading(true);
                    userService.changePassword({ version: userData.version, ...values });
                    console.log(3477734);
                    try {
                      notificationSuccess('Account was succesfully updated');
                    } catch (err) {
                      if (err instanceof Error) notificationError(err.message);
                    } finally {
                      setIsLoading(false);
                    }
                  })}
                >
                  <PasswordInput
                    pt={10}
                    withAsterisk
                    autoComplete="current-password"
                    label="Password"
                    placeholder="Password"
                    {...passwordForm.getInputProps('currentPassword')}
                  />
                  <PasswordInput
                    pt={10}
                    withAsterisk
                    autoComplete="new-password"
                    label="New Password"
                    placeholder="New Password"
                    {...passwordForm.getInputProps('newPassword')}
                  />
                  <Button type="submit" loading={isLoading} fullWidth mt={20}>
                    Save Changes
                  </Button>
                </form>
              </Modal>

              <Flex align="left" mb={10} direction="column">
                <Text color="dimmed" size="sm" align="center" pt={5}>
                  Do you want to change password?
                </Text>
                <Button onClick={open} color="red" style={{ width: '180px', margin: 'auto' }}>
                  Change password
                </Button>
              </Flex>
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
          <Flex align="center" justify="center" style={{ padding: '0 24px 0 24px' }}>
            <Button type="submit" loading={isLoading} style={{ width: '180px', marginTop: '10px' }}>
              Save Changes
            </Button>
          </Flex>
        </Paper>
      </form>
    </Container>
  );
};
export default ProfileEdit;
